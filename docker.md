version: '3.8'

services:
  sqlserver:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: sqlserver-compose
    environment:
      - ACCEPT_EULA=Y
      - MSSQL_SA_PASSWORD=MyPass@123
      - MSSQL_PID=Developer
    ports:
      - "1435:1433"
    volumes:
      - sqlserver_data:/var/opt/mssql
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "/opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P 'MyPass@123' -C -Q 'SELECT 1'"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s

volumes:
  sqlserver_data:



# 🚀 Complete Tutorial: SQL Server with Docker

## 1. Basic Setup

### Run SQL Server 2022 Container
```bash
# Run SQL Server 2022 on port 1434
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=MyPass@123" \
   -p 1434:1433 --name sqlserver2022 -d \
   mcr.microsoft.com/mssql/server:2022-latest
```

### Connection Details
- **Host**: `localhost`
- **Port**: `1434` (mapped from container's 1433)
- **Username**: `SA` (System Administrator)
- **Password**: `MyPass@123`

## 2. Ways to Interact with SQL Server

### Method 1: Using sqlcmd inside the container
```bash
# Interactive session
docker exec -it sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C

# Single query
docker exec -it sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -Q "SELECT @@VERSION"
```

### Method 2: Connect from host machine
```bash
# Install sqlcmd on host (if needed)
curl https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -
curl https://packages.microsoft.com/config/ubuntu/20.04/prod.list | sudo tee /etc/apt/sources.list.d/msprod.list
sudo apt-get update
sudo apt-get install mssql-tools18 unixodbc-dev

# Connect from host
sqlcmd -S localhost,1434 -U SA -P "MyPass@123" -C
```

### Method 3: Using GUI Tools
- **Azure Data Studio** (Cross-platform)
- **SQL Server Management Studio** (Windows)
- **VS Code** with SQL Server extension
- **DBeaver** (Cross-platform)

## 3. Basic Database Operations

### List All Databases
```bash
# Simple list of database names
docker exec -it sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -Q "
SELECT name FROM sys.databases ORDER BY name;
"

# Detailed database information
docker exec -it sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -Q "
SELECT 
    name AS DatabaseName,
    database_id AS ID,
    create_date AS CreatedDate,
    collation_name AS Collation
FROM sys.databases 
ORDER BY name;
"
```

### Create Database
```bash
docker exec -it sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -Q "
CREATE DATABASE SampleDB;
SELECT name FROM sys.databases WHERE name = 'SampleDB';
"
```

### Create Database from Script File
```bash
# Method 1: Copy script to container and execute
docker cp /path/to/your/database.sql sqlserver2022:/tmp/database.sql
docker exec sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -i /tmp/database.sql

# Method 2: Execute script directly from host (if file has proper encoding)
docker exec -i sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C < /path/to/your/database.sql

# Method 3: Using volume mount
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=MyPass@123" \
   -p 1434:1433 --name sqlserver-with-scripts \
   -v /path/to/scripts:/scripts \
   -d mcr.microsoft.com/mssql/server:2022-latest

# Then execute script from mounted volume
docker exec sqlserver-with-scripts /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -i /scripts/database.sql

# Clean up temporary files after execution
docker exec -u root sqlserver2022 rm /tmp/database.sql
```

### Example: Creating Multiple Databases from Scripts
```bash
# Create LipstickDatabase
docker cp LipstickDatabase.sql sqlserver2022:/tmp/LipstickDatabase.sql
docker exec sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -i /tmp/LipstickDatabase.sql

# Create LipstickMemberDatabase  
docker cp LipstickMemberDatabase.sql sqlserver2022:/tmp/LipstickMemberDatabase.sql
docker exec sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -i /tmp/LipstickMemberDatabase.sql

# Create LulusiaDatabase
docker cp LulusiaDatabase.sql sqlserver2022:/tmp/LulusiaDatabase.sql
docker exec sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -i /tmp/LulusiaDatabase.sql

# Verify all databases were created
docker exec sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -Q "SELECT name FROM sys.databases ORDER BY name;"

# Clean up temporary files
docker exec -u root sqlserver2022 rm /tmp/LipstickDatabase.sql /tmp/LipstickMemberDatabase.sql /tmp/LulusiaDatabase.sql
```

### Delete Database
```bash
# Delete a database
docker exec -it sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -Q "
DROP DATABASE SampleDB;
"

# Verify database was deleted
docker exec -it sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -Q "
SELECT name FROM sys.databases ORDER BY name;
"
```

### Create Table and Insert Data
```bash
docker exec -it sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -Q "
USE SampleDB;
CREATE TABLE Users (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(255) UNIQUE,
    CreatedDate DATETIME2 DEFAULT GETDATE()
);
INSERT INTO Users (Name, Email) VALUES 
    ('John Doe', 'john@example.com'),
    ('Jane Smith', 'jane@example.com'),
    ('Bob Johnson', 'bob@example.com');
SELECT * FROM Users;
"
```

### Query Data
```bash
docker exec -it sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -Q "
USE SampleDB;
SELECT COUNT(*) as UserCount FROM Users;
SELECT Name, Email, CreatedDate FROM Users WHERE Name LIKE '%John%';
"
```

## 4. Container Management

### Basic Commands
```bash
# View running containers
docker ps

# Stop SQL Server
docker stop sqlserver2022

# Start SQL Server
docker start sqlserver2022

# Restart SQL Server
docker restart sqlserver2022

# View SQL Server logs
docker logs sqlserver2022

# Follow logs in real-time
docker logs -f sqlserver2022

# Remove container (when done)
docker rm -f sqlserver2022
```

### Health Check
```bash
# Check if SQL Server is ready
docker exec sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -Q "SELECT 1"
```

## 5. Data Persistence

### Using Named Volumes
```bash
# Create container with persistent storage
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=MyPass@123" \
   -p 1434:1433 --name sqlserver-persistent \
   -v sqlserver-data:/var/opt/mssql \
   -d mcr.microsoft.com/mssql/server:2022-latest
```

### Backup and Restore
```bash
# Create backup
docker exec -it sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -Q "
BACKUP DATABASE SampleDB 
TO DISK = '/var/opt/mssql/data/SampleDB.bak'
WITH FORMAT, INIT;
"

# List backup files
docker exec sqlserver2022 find /var/opt/mssql -name "*.bak" -type f

# Remove backup file
docker exec sqlserver2022 rm /var/opt/mssql/data/SampleDB.bak

# Restore database
docker exec -it sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -Q "
RESTORE DATABASE SampleDB_Restored 
FROM DISK = '/var/opt/mssql/data/SampleDB.bak'
WITH MOVE 'SampleDB' TO '/var/opt/mssql/data/SampleDB_Restored.mdf',
MOVE 'SampleDB_Log' TO '/var/opt/mssql/data/SampleDB_Restored.ldf';
"
```

## 6. Database Script Management

### Preparing SQL Script Files
```bash
# Ensure your SQL script has proper encoding (UTF-8 without BOM)
# Your script should start with database creation:
# Create Database [YourDatabaseName];
# GO
# USE [YourDatabaseName]
# GO
# ... rest of your tables and data ...
```

### Script Execution Best Practices
```bash
# Always check if database exists before creating
docker exec sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -Q "
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'YourDatabase')
BEGIN
    CREATE DATABASE YourDatabase;
END
"

# Check script execution results
docker exec sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -Q "
USE YourDatabase;
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE';
"
```

### Automated Database Setup Script
```bash
#!/bin/bash
# create_databases.sh

# Array of database script files
databases=("LipstickDatabase.sql" "LipstickMemberDatabase.sql" "LulusiaDatabase.sql")

echo "Starting database setup..."

for db_script in "${databases[@]}"; do
    if [ -f "$db_script" ]; then
        echo "Creating database from $db_script..."
        
        # Copy script to container
        docker cp "$db_script" sqlserver2022:/tmp/"$db_script"
        
        # Execute script
        docker exec sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -i /tmp/"$db_script"
        
        # Clean up
        docker exec -u root sqlserver2022 rm /tmp/"$db_script"
        
        echo "✅ Database from $db_script created successfully!"
    else
        echo "❌ Script file $db_script not found!"
    fi
done

echo "Database setup completed!"

# Verify all databases
echo "Current databases:"
docker exec sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -Q "SELECT name FROM sys.databases WHERE name NOT IN ('master', 'tempdb', 'model', 'msdb') ORDER BY name;"
```

### Using the Automated Script
```bash
# Make script executable
chmod +x create_databases.sh

# Run the automated setup (from LulusiaKingdom directory)
./create_databases.sh

# The script will:
# 1. Check if SQL Server is running
# 2. Execute all database scripts automatically
# 3. Clean up temporary files
# 4. Show summary of created databases
```

### Troubleshooting Script Execution
```bash
# Check for encoding issues
file -bi your_script.sql

# Convert file encoding if needed
iconv -f ISO-8859-1 -t UTF-8 your_script.sql > your_script_utf8.sql

# Test script syntax before execution
docker exec sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -Q "SET NOEXEC ON; GO" -i /tmp/your_script.sql

# Check SQL Server logs for errors
docker logs sqlserver2022 --tail 50

# Monitor script execution in real-time
docker exec sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -i /tmp/your_script.sql -o /tmp/output.log
docker exec sqlserver2022 cat /tmp/output.log
```

## 7. Advanced Operations

### Import/Export Data
```bash
# Copy file to container
docker cp data.csv sqlserver2022:/tmp/data.csv

# Bulk insert
docker exec -it sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -Q "
USE SampleDB;
BULK INSERT Users
FROM '/tmp/data.csv'
WITH (
    FIELDTERMINATOR = ',',
    ROWTERMINATOR = '\n',
    FIRSTROW = 2
);
"
```

### Performance Monitoring
```bash
# Check database sizes
docker exec -it sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -Q "
SELECT 
    DB_NAME(database_id) AS DatabaseName,
    (size * 8.0) / 1024 AS SizeMB
FROM sys.master_files
WHERE type_desc = 'ROWS';
"

# Check active connections
docker exec -it sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -Q "
SELECT 
    session_id,
    login_name,
    host_name,
    program_name,
    login_time
FROM sys.dm_exec_sessions
WHERE is_user_process = 1;
"
```

## 8. Docker Compose Setup

### Complete docker-compose.yml
```yaml
version: '3.8'

services:
  sqlserver:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: sqlserver-compose
    environment:
      - ACCEPT_EULA=Y
      - MSSQL_SA_PASSWORD=MyPass@123
      - MSSQL_PID=Developer
    ports:
      - "1435:1433"
    volumes:
      - sqlserver_data:/var/opt/mssql
      - ./scripts:/scripts
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "/opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P 'MyPass@123' -C -Q 'SELECT 1'"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s

volumes:
  sqlserver_data:
```

### Using Docker Compose
```bash
# Start services
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down

# Stop and remove volumes
docker compose down -v
```

## 9. Security Best Practices

### Strong Password
```bash
# Use complex password
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=MyVeryStrong@Password123!" \
   -p 1434:1433 --name sqlserver-secure \
   -d mcr.microsoft.com/mssql/server:2022-latest
```

### Create Database User
```bash
docker exec -it sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -Q "
USE SampleDB;
CREATE LOGIN appuser WITH PASSWORD = 'AppUser@123!';
CREATE USER appuser FOR LOGIN appuser;
ALTER ROLE db_datareader ADD MEMBER appuser;
ALTER ROLE db_datawriter ADD MEMBER appuser;
"
```

## 10. Troubleshooting

### Common Issues
```bash
# Check container status
docker ps -a

# View detailed logs
docker logs sqlserver2022 --details

# Check port usage
ss -tlnp | grep 1434

# Enter container shell
docker exec -it sqlserver2022 /bin/bash

# Check SQL Server processes
docker exec sqlserver2022 ps aux | grep sql
```

### Cleanup
```bash
# Stop all SQL Server containers
docker stop $(docker ps -q --filter ancestor=mcr.microsoft.com/mssql/server:2022-latest)

# Remove all SQL Server containers
docker rm $(docker ps -aq --filter ancestor=mcr.microsoft.com/mssql/server:2022-latest)

# Remove unused volumes
docker volume prune
```

## 11. Connection Examples

### Python Connection
```python
import pyodbc

server = 'localhost,1434'
database = 'SampleDB'
username = 'SA'
password = 'MyPass@123'

conn = pyodbc.connect(
    'DRIVER={ODBC Driver 18 for SQL Server};'
    f'SERVER={server};'
    f'DATABASE={database};'
    f'UID={username};'
    f'PWD={password};'
    'TrustServerCertificate=yes;'
)

cursor = conn.cursor()
cursor.execute("SELECT * FROM Users")
for row in cursor:
    print(row)
```

### .NET Connection String
```csharp
"Server=localhost,1434;Database=SampleDB;User Id=SA;Password=MyPass@123;TrustServerCertificate=true;"
```

### Node.js Connection
```javascript
const sql = require('mssql');

const config = {
    user: 'SA',
    password: 'MyPass@123',
    server: 'localhost',
    port: 1434,
    database: 'SampleDB',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

sql.connect(config).then(pool => {
    return pool.request().query('SELECT * FROM Users');
}).then(result => {
    console.log(result.recordset);
});
```

---

🎉 **You're now ready to work with SQL Server in Docker!**


 **Show List of Databases - Quick Commands
Method 1: Simple Database List**

docker exec sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -Q "SELECT name FROM sys.databases ORDER BY name;"

Method 2: Interactive Mode

# Enter interactive SQL session
docker exec -it sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C

# Then run SQL commands:
SELECT name FROM sys.databases ORDER BY name;
GO