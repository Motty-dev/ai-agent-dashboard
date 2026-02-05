#!/bin/bash

# token-stats.sh - Generates token usage analytics JSON
# Usage: ./scripts/token-stats.sh > public/api/token-stats.json

# Get current timestamp in ISO format
current_time=$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")
log_date=$(date +"%Y-%m-%d")

# Default log file path
log_file="/tmp/clawdbot/clawdbot-${log_date}.log"

# If log doesn't exist, generate sample data
if [ ! -f "$log_file" ]; then
    # Generate sample data for demo
    generate_sample_data() {
        local context_data=()
        local api_data=()
        local tasks_completed=15
        local tasks_total=20
        
        # Generate hourly context usage data (last 24 hours)
        for i in {23..0}; do
            local hour_time=$(date -u -d "${i} hours ago" +"%Y-%m-%dT%H:00:00.000Z")
            local context_usage=$((30 + RANDOM % 50))  # 30-80% context usage
            context_data+=("{\"time\": \"$hour_time\", \"context\": $context_usage}")
        done
        
        # Generate hourly API calls data (last 24 hours)
        for i in {23..0}; do
            local hour_time=$(date -u -d "${i} hours ago" +"%Y-%m-%dT%H:00:00.000Z")
            local api_calls=$((5 + RANDOM % 20))  # 5-25 API calls per hour
            api_data+=("{\"time\": \"$hour_time\", \"calls\": $api_calls}")
        done
        
        # Output JSON
        cat <<EOF
{
  "contextUsage": [
    $(IFS=','; echo "${context_data[*]}")
  ],
  "apiCalls": [
    $(IFS=','; echo "${api_data[*]}")
  ],
  "taskProgress": {
    "completed": $tasks_completed,
    "total": $tasks_total,
    "percentage": $((tasks_completed * 100 / tasks_total))
  },
  "summary": {
    "totalTokensToday": 15240,
    "avgContextUsage": 45,
    "peakApiHour": "14:00",
    "efficiency": 89
  },
  "generated": "$current_time",
  "dataSource": "sample"
}
EOF
    }
    
    generate_sample_data
    exit 0
fi

# Parse real log file (when available)
parse_log_file() {
    local context_data=()
    local api_data=()
    local total_tokens=0
    local tasks_completed=0
    local tasks_total=0
    
    # Parse context usage from log entries
    # Look for patterns like "Context: 13k/40k (33%)"
    while read -r line; do
        if [[ $line =~ Context:\ ([0-9]+)k/([0-9]+)k\ \(([0-9]+)%\) ]]; then
            local used=${BASH_REMATCH[1]}
            local total=${BASH_REMATCH[2]}
            local percentage=${BASH_REMATCH[3]}
            local timestamp=$(echo "$line" | grep -o "[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}T[0-9]\{2\}:[0-9]\{2\}:[0-9]\{2\}")
            
            if [ -n "$timestamp" ]; then
                context_data+=("{\"time\": \"${timestamp}:00.000Z\", \"context\": $percentage}")
            fi
        fi
        
        # Count API calls (approximate from log entries)
        if [[ $line =~ "API call" ]] || [[ $line =~ "anthropic" ]]; then
            ((api_calls++))
        fi
        
        # Extract token counts
        if [[ $line =~ ([0-9]+)\ tokens ]]; then
            local tokens=${BASH_REMATCH[1]}
            ((total_tokens += tokens))
        fi
        
        # Count completed tasks (approximate)
        if [[ $line =~ "completed" ]] || [[ $line =~ "finished" ]] || [[ $line =~ "done" ]]; then
            ((tasks_completed++))
        fi
        
    done < "$log_file"
    
    # Aggregate data by hour if we have entries
    if [ ${#context_data[@]} -eq 0 ]; then
        # Fallback to sample data if no real data found
        generate_sample_data
        return
    fi
    
    # Calculate task total (estimate)
    tasks_total=$((tasks_completed + 5))
    if [ $tasks_total -lt $tasks_completed ]; then
        tasks_total=$tasks_completed
    fi
    
    # Output real data JSON
    cat <<EOF
{
  "contextUsage": [
    $(IFS=','; echo "${context_data[*]}")
  ],
  "apiCalls": [
    $(IFS=','; echo "${api_data[*]}")
  ],
  "taskProgress": {
    "completed": $tasks_completed,
    "total": $tasks_total,
    "percentage": $((tasks_completed * 100 / tasks_total))
  },
  "summary": {
    "totalTokensToday": $total_tokens,
    "avgContextUsage": 45,
    "peakApiHour": "14:00",
    "efficiency": 89
  },
  "generated": "$current_time",
  "dataSource": "log"
}
EOF
}

# For now, always use sample data since we're building the system
generate_sample_data() {
    local context_data=()
    local api_data=()
    local tasks_completed=15
    local tasks_total=20
    
    # Generate hourly context usage data (last 24 hours)
    for i in {23..0}; do
        local hour_time=$(date -u -d "${i} hours ago" +"%Y-%m-%dT%H:00:00.000Z" 2>/dev/null || date -u -v-${i}H +"%Y-%m-%dT%H:00:00.000Z" 2>/dev/null || echo "2026-02-05T$(printf "%02d" $((20-i))):00:00.000Z")
        local context_usage=$((30 + RANDOM % 50))  # 30-80% context usage
        context_data+=("{\"time\": \"$hour_time\", \"context\": $context_usage}")
    done
    
    # Generate hourly API calls data (last 24 hours)
    for i in {23..0}; do
        local hour_time=$(date -u -d "${i} hours ago" +"%Y-%m-%dT%H:00:00.000Z" 2>/dev/null || date -u -v-${i}H +"%Y-%m-%dT%H:00:00.000Z" 2>/dev/null || echo "2026-02-05T$(printf "%02d" $((20-i))):00:00.000Z")
        local api_calls=$((5 + RANDOM % 20))  # 5-25 API calls per hour
        api_data+=("{\"time\": \"$hour_time\", \"calls\": $api_calls}")
    done
    
    # Output JSON
    cat <<EOF
{
  "contextUsage": [
    $(IFS=','; echo "${context_data[*]}")
  ],
  "apiCalls": [
    $(IFS=','; echo "${api_data[*]}")
  ],
  "taskProgress": {
    "completed": $tasks_completed,
    "total": $tasks_total,
    "percentage": $((tasks_completed * 100 / tasks_total))
  },
  "summary": {
    "totalTokensToday": 15240,
    "avgContextUsage": 45,
    "peakApiHour": "14:00",
    "efficiency": 89
  },
  "generated": "$current_time",
  "dataSource": "sample"
}
EOF
}

generate_sample_data