#!/bin/bash
# create_databases.sh - Automated database setup script for LulusiaKingdom

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if SQL Server container is running
check_sqlserver() {
    if ! docker ps | grep -q sqlserver2022; then
        print_error "SQL Server container 'sqlserver2022' is not running!"
        print_status "Starting SQL Server container..."
        docker start sqlserver2022
        sleep 10
    fi
    
    # Test connection
    if docker exec sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -Q "SELECT 1" > /dev/null 2>&1; then
        print_success "SQL Server is ready!"
    else
        print_error "Cannot connect to SQL Server!"
        exit 1
    fi
}

# Function to execute SQL script
execute_script() {
    local script_file=$1
    local script_path="WebCore.Server/wwwroot/$script_file"
    
    if [ -f "$script_path" ]; then
        print_status "Creating database from $script_file..."
        
        # Copy script to container
        docker cp "$script_path" sqlserver2022:/tmp/"$script_file"
        
        # Execute script
        if docker exec sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -i /tmp/"$script_file" > /dev/null 2>&1; then
            print_success "Database from $script_file created successfully!"
        else
            print_error "Failed to execute $script_file"
            return 1
        fi
        
        # Clean up
        docker exec -u root sqlserver2022 rm /tmp/"$script_file" 2>/dev/null
        
    else
        print_warning "Script file $script_path not found! Skipping..."
        return 1
    fi
}

# Main execution
main() {
    print_status "Starting LulusiaKingdom database setup..."
    echo "======================================================"
    
    # Check SQL Server status
    check_sqlserver
    
    # Array of database script files
    databases=("LipstickDatabase.sql" "LipstickMemberDatabase.sql" "LulusiaDatabase.sql")
    
    success_count=0
    total_count=${#databases[@]}
    
    # Execute each script
    for db_script in "${databases[@]}"; do
        if execute_script "$db_script"; then
            ((success_count++))
        fi
        echo "------------------------------------------------------"
    done
    
    # Summary
    echo "======================================================"
    print_status "Database setup completed!"
    print_status "Successfully created: $success_count/$total_count databases"
    
    # Verify all databases
    print_status "Current databases in SQL Server:"
    docker exec sqlserver2022 /opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "MyPass@123" -C -Q "
    SELECT 
        name AS DatabaseName,
        create_date AS CreatedDate
    FROM sys.databases 
    WHERE name NOT IN ('master', 'tempdb', 'model', 'msdb') 
    ORDER BY name;
    " 2>/dev/null || print_error "Failed to list databases"
    
    echo "======================================================"
    print_success "Setup complete! 🎉"
    echo ""
    print_status "Connection Details:"
    echo "  Host: localhost"
    echo "  Port: 1434"
    echo "  Username: SA"
    echo "  Password: MyPass@123"
    echo ""
    print_status "Connection String Template:"
    echo "  Server=localhost,1434;Database={DatabaseName};User Id=SA;Password=MyPass@123;TrustServerCertificate=true;"
}

# Run main function
main "$@"
