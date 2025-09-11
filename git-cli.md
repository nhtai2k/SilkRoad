# Git CLI Tutorial

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Basic Configuration](#basic-configuration)
4. [Essential Commands](#essential-commands)
5. [Working with Branches](#working-with-branches)
6. [Remote Repositories](#remote-repositories)
7. [Advanced Operations](#advanced-operations)
8. [Best Practices](#best-practices)

## Introduction

Git is a distributed version control system that helps you track changes in your code over time. The Git CLI (Command Line Interface) provides powerful tools for managing your repositories.

## Installation

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install git
```

### Verify Installation
```bash
git --version
```

## Basic Configuration

Before using Git, configure your identity:

```bash
# Set your name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default branch name
git config --global init.defaultBranch main

# View configuration
git config --list
```

## Essential Commands

### Initialize a Repository
```bash
# Create a new repository
git init

# Clone an existing repository
git clone <repository-url>
```

### Basic Workflow
```bash
# Check repository status
git status

# Add files to staging area
git add <filename>          # Add specific file
git add .                   # Add all files
git add *.js               # Add all JavaScript files

# Commit changes
git commit -m "Your commit message"

# View commit history
git log
git log --oneline          # Simplified view
git log --graph            # Visual graph
```

### Working with Files
```bash
# Show differences
git diff                   # Unstaged changes
git diff --staged          # Staged changes
git diff HEAD~1            # Compare with previous commit

# Remove files
git rm <filename>          # Remove and stage deletion
git rm --cached <filename> # Remove from Git but keep locally

# Move/rename files
git mv <old-name> <new-name>
```

## Working with Branches

### Branch Operations
```bash
# List branches
git branch                 # Local branches
git branch -r              # Remote branches
git branch -a              # All branches

# Create and switch branches
git branch <branch-name>   # Create branch
git checkout <branch-name> # Switch to branch
git checkout -b <branch-name> # Create and switch

# Modern alternative (Git 2.23+)
git switch <branch-name>   # Switch to branch
git switch -c <branch-name> # Create and switch

# Delete branches
git branch -d <branch-name>  # Safe delete
git branch -D <branch-name>  # Force delete
```

### Merging
```bash
# Merge branch into current branch
git merge <branch-name>

# Merge with no fast-forward
git merge --no-ff <branch-name>

# Abort merge (if conflicts)
git merge --abort
```

## Remote Repositories

### Remote Management
```bash
# Add remote repository
git remote add origin <repository-url>

# View remotes
git remote -v

# Remove remote
git remote remove <remote-name>
```

### Synchronization

#### Fetching Changes
```bash
# Fetch changes from remote (doesn't merge)
git fetch origin           # Fetch from origin
git fetch origin <branch>  # Fetch specific branch
git fetch --all           # Fetch from all remotes

# See what was fetched
git log HEAD..origin/master  # See commits on remote
git diff HEAD origin/master  # See differences
```

#### Pulling Changes
```bash
# Pull changes (fetch + merge)
git pull origin <branch-name>
git pull                   # Current branch
git pull --rebase          # Pull with rebase instead of merge
git pull --ff-only         # Only fast-forward pulls
```

#### Pushing Changes
```bash
# Push changes
git push origin <branch-name>
git push -u origin <branch-name> # Set upstream and push
git push                   # After upstream is set

# Force push (use with caution!)
git push --force           # Dangerous - overwrites remote
git push --force-with-lease # Safer - checks for updates first
```

#### Resolving Push Rejections
When you get a "non-fast-forward" error like this:
```
error: failed to push some refs
hint: Updates were rejected because the tip of your current branch is behind
```

**Solution 1: Pull first (recommended)**
```bash
# Fetch and see what changed
git fetch origin
git log HEAD..origin/master  # See remote commits

# Pull to merge remote changes
git pull origin master       # This will create a merge commit
# OR
git pull --rebase origin master  # This will replay your commits on top

# Now push
git push origin master
```

**Solution 2: Force push (dangerous - only if you're sure)**
```bash
# Only use if you're certain you want to overwrite remote history
git push --force-with-lease origin master
```

**Solution 3: Reset and start over**
```bash
# If you want to discard local changes and match remote
git fetch origin
git reset --hard origin/master  # WARNING: This discards local changes
```

## Advanced Operations

### Stashing
```bash
# Save work temporarily
git stash
git stash -m "Work in progress"

# List stashes
git stash list

# Apply stash
git stash apply            # Keep stash
git stash pop              # Apply and remove stash

# Drop stash
git stash drop <stash-id>
```

### Undoing Changes
```bash
# Unstage files
git reset <filename>
git reset                  # Unstage all

# Undo commits
git reset --soft HEAD~1    # Keep changes staged
git reset --mixed HEAD~1   # Keep changes unstaged
git reset --hard HEAD~1    # Discard changes

# Revert commits (safe for shared history)
git revert <commit-hash>
```

### Rebasing
```bash
# Rebase current branch onto another
git rebase <branch-name>

# Interactive rebase
git rebase -i HEAD~3       # Last 3 commits

# Continue/abort rebase
git rebase --continue
git rebase --abort
```

### Cherry Picking
```bash
# Apply specific commit to current branch
git cherry-pick <commit-hash>
```

### Tags
```bash
# Create tags
git tag <tag-name>         # Lightweight tag
git tag -a <tag-name> -m "Tag message" # Annotated tag

# List tags
git tag

# Push tags
git push origin <tag-name>
git push origin --tags     # All tags
```

## Best Practices

### Commit Messages
- Use present tense ("Add feature" not "Added feature")
- Keep first line under 50 characters
- Add detailed description after blank line if needed

```bash
# Good commit message format
git commit -m "Add user authentication feature

- Implement login/logout functionality
- Add password hashing
- Create user session management"
```

### Branch Naming
```bash
# Use descriptive names
feature/user-authentication
bugfix/login-error
hotfix/security-patch
```

### Common Workflows

#### Feature Branch Workflow
```bash
# Start new feature
git checkout -b feature/new-feature
# Make changes and commits
git add .
git commit -m "Implement new feature"
# Push and create pull request
git push -u origin feature/new-feature
```

#### Gitflow Workflow
```bash
# Main branches: main, develop
# Supporting branches: feature/, release/, hotfix/

# Start feature
git checkout develop
git checkout -b feature/my-feature
# Complete feature
git checkout develop
git merge --no-ff feature/my-feature
git branch -d feature/my-feature
```

### Useful Aliases
Add these to your Git configuration:

```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
git config --global alias.lg "log --oneline --graph --decorate"
```

### Troubleshooting

#### Common Issues
```bash
# Resolve merge conflicts
# 1. Edit conflicted files manually
# 2. Add resolved files
git add <resolved-files>
# 3. Complete merge
git commit

# Fix last commit message
git commit --amend -m "New commit message"

# Ignore files
echo "node_modules/" >> .gitignore
git add .gitignore
git commit -m "Add gitignore"
```

Remember: Git is powerful but can be complex. Start with basic commands and gradually learn advanced features