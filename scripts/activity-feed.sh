#!/bin/bash

# activity-feed.sh - Generates activity feed JSON for the dashboard

# Get current timestamp in ISO format
current_time=$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")

# Initialize activities array
activities=()

# Function to add git commits
add_git_commits() {
    if [ -d ".git" ]; then
        local commits
        commits=$(git log --oneline -10 --pretty=format:'%H|%s|%ci' 2>/dev/null)
        
        while IFS='|' read -r hash message timestamp; do
            [ -z "$hash" ] && continue
            
            # Convert git timestamp to ISO format
            iso_timestamp=$(date -u -d "$timestamp" +"%Y-%m-%dT%H:%M:%S.000Z" 2>/dev/null || echo "$current_time")
            
            # Escape quotes in message
            message=$(echo "$message" | sed 's/"/\\"/g')
            
            local activity="{
  \"id\": \"git_$hash\",
  \"type\": \"git\",
  \"title\": \"Git Commit\",
  \"description\": \"$message\",
  \"timestamp\": \"$iso_timestamp\",
  \"details\": \"Commit: $hash\\nMessage: $message\\nDate: $timestamp\"
}"
            activities+=("$activity")
        done <<< "$commits"
    fi
}

# Function to add file changes
add_file_changes() {
    if [ -d ".git" ]; then
        local files
        files=$(git diff --name-only HEAD~1 2>/dev/null | head -5)
        
        while read -r file; do
            [ -z "$file" ] && continue
            
            # Get file modification time or use current time
            local mod_time
            if [ -f "$file" ]; then
                mod_time=$(stat -f "%Sm" -t "%Y-%m-%dT%H:%M:%S.000Z" "$file" 2>/dev/null || echo "$current_time")
            else
                mod_time="$current_time"
            fi
            
            local file_id=$(echo "$file" | tr '/' '_' | tr '.' '_')
            
            local activity="{
  \"id\": \"file_${file_id}_$(date +%s)\",
  \"type\": \"file\",
  \"title\": \"File Modified\",
  \"description\": \"$file\",
  \"timestamp\": \"$mod_time\",
  \"details\": \"File: $file\\nLast modified: $mod_time\"
}"
            activities+=("$activity")
        done <<< "$files"
    fi
}

# Function to add memory updates
add_memory_updates() {
    local today
    today=$(date +"%Y-%m-%d")
    
    # Check MEMORY.md
    if [ -f "MEMORY.md" ]; then
        local mod_time
        mod_time=$(stat -f "%Sm" -t "%Y-%m-%dT%H:%M:%S.000Z" "MEMORY.md" 2>/dev/null || echo "$current_time")
        local mod_date=$(echo "$mod_time" | cut -d'T' -f1)
        
        if [ "$mod_date" = "$today" ]; then
            local activity="{
  \"id\": \"memory_main_$(date +%s)\",
  \"type\": \"memory\",
  \"title\": \"Memory Updated\",
  \"description\": \"MEMORY.md updated\",
  \"timestamp\": \"$mod_time\",
  \"details\": \"Main memory file updated with new information\"
}"
            activities+=("$activity")
        fi
    fi
    
    # Check for daily memory files
    if [ -d "memory" ]; then
        local memfiles
        memfiles=$(find memory -name "*.md" -newermt "$today" 2>/dev/null | head -3)
        
        while read -r memfile; do
            [ -z "$memfile" ] && continue
            [ ! -f "$memfile" ] && continue
            
            local mod_time
            mod_time=$(stat -f "%Sm" -t "%Y-%m-%dT%H:%M:%S.000Z" "$memfile" 2>/dev/null || echo "$current_time")
            local basename_file=$(basename "$memfile" .md)
            
            local activity="{
  \"id\": \"memory_${basename_file}_$(date +%s)\",
  \"type\": \"memory\",
  \"title\": \"Daily Memory\",
  \"description\": \"Updated $(basename "$memfile")\",
  \"timestamp\": \"$mod_time\",
  \"details\": \"Daily memory file: $memfile\\nUpdated: $mod_time\"
}"
            activities+=("$activity")
        done <<< "$memfiles"
    fi
}

# Function to add recent commands (simplified for demo)
add_recent_commands() {
    local commands=("npm run build" "git commit -m \"update\"" "git push" "ls -la" "cd ai-agent-dashboard")
    
    for i in "${!commands[@]}"; do
        local minutes_ago=$((i * 5))
        local cmd_time
        cmd_time=$(date -u -v-${minutes_ago}M +"%Y-%m-%dT%H:%M:%S.000Z" 2>/dev/null || date -u -d "${minutes_ago} minutes ago" +"%Y-%m-%dT%H:%M:%S.000Z" 2>/dev/null || echo "$current_time")
        
        local command="${commands[i]}"
        command=$(echo "$command" | sed 's/"/\\"/g')
        
        local activity="{
  \"id\": \"cmd_${i}_$(date +%s)\",
  \"type\": \"command\",
  \"title\": \"Command Executed\",
  \"description\": \"$command\",
  \"timestamp\": \"$cmd_time\",
  \"details\": \"Command: $command\\nExecuted: $cmd_time\"
}"
        activities+=("$activity")
    done
}

# Collect all activities
add_git_commits
add_file_changes
add_memory_updates
add_recent_commands

# Generate JSON output
echo "{"
echo "  \"activities\": ["

# Output activities with proper JSON formatting
for i in "${!activities[@]}"; do
    if [ $i -eq 0 ]; then
        echo -n "    ${activities[i]}"
    else
        echo -n ",
    ${activities[i]}"
    fi
done

echo ""
echo "  ],"
echo "  \"generated\": \"$current_time\""
echo "}"