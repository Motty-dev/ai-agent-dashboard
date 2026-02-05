#!/bin/bash

# task-manager.sh - Manages tasks JSON data for the dashboard
# Usage: ./scripts/task-manager.sh > public/api/tasks.json

# Get current timestamp in ISO format
current_time=$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")

# Path to the tasks file in the workspace
tasks_file="$HOME/clawd/tasks.json"

# Function to generate sample tasks for demo
generate_sample_tasks() {
    cat <<EOF
{
  "tasks": [
    {
      "id": "task_1738871234567_abc123def",
      "title": "Review AI Agent Dashboard",
      "description": "Test all features including activity feed, analytics charts, and task management. Verify responsive design and data updates.",
      "priority": "high",
      "status": "progress",
      "dueDate": "2026-02-07",
      "createdAt": "2026-02-03T12:00:00.000Z"
    },
    {
      "id": "task_1738871234568_def456ghi",
      "title": "Implement real-time data updates",
      "description": "Connect dashboard to actual clawdbot logs and configuration files for live data display.",
      "priority": "medium",
      "status": "todo",
      "dueDate": "2026-02-09",
      "createdAt": "2026-02-04T10:30:00.000Z"
    },
    {
      "id": "task_1738871234569_ghi789jkl",
      "title": "Set up GitHub Pages deployment",
      "description": "Configure automatic deployment pipeline with proper caching and CDN optimization.",
      "priority": "medium",
      "status": "done",
      "dueDate": "2026-02-04",
      "createdAt": "2026-02-02T14:15:00.000Z",
      "completedAt": "2026-02-05T14:00:00.000Z"
    },
    {
      "id": "task_1738871234570_jkl012mno",
      "title": "Add drag-and-drop functionality",
      "description": "Implement Kanban-style task management with smooth drag-and-drop animations using dnd-kit.",
      "priority": "low",
      "status": "done",
      "dueDate": "2026-02-03",
      "createdAt": "2026-02-01T09:20:00.000Z",
      "completedAt": "2026-02-05T18:00:00.000Z"
    },
    {
      "id": "task_1738871234571_mno345pqr",
      "title": "Optimize bundle size",
      "description": "Review and optimize JavaScript bundle size. Consider code splitting and lazy loading for better performance.",
      "priority": "low",
      "status": "todo",
      "createdAt": "2026-02-05T08:00:00.000Z"
    },
    {
      "id": "task_1738871234572_pqr678stu",
      "title": "Add task priority indicators",
      "description": "Implement color-coded priority badges and due date warnings in the task cards.",
      "priority": "high",
      "status": "progress",
      "dueDate": "2026-02-06",
      "createdAt": "2026-02-05T12:00:00.000Z"
    },
    {
      "id": "task_1738871234573_stu901vwx",
      "title": "Write documentation",
      "description": "Create comprehensive documentation for the AI Agent Dashboard including setup, usage, and API reference.",
      "priority": "medium",
      "status": "todo",
      "dueDate": "2026-02-10",
      "createdAt": "2026-02-05T16:00:00.000Z"
    },
    {
      "id": "task_1738871234574_vwx234yz",
      "title": "Performance testing",
      "description": "Conduct thorough performance testing on all dashboard components with large datasets.",
      "priority": "high",
      "status": "todo",
      "dueDate": "2026-02-08",
      "createdAt": "2026-02-05T14:30:00.000Z"
    }
  ],
  "lastUpdated": "$current_time"
}
EOF
}

# Function to read tasks from workspace file
read_workspace_tasks() {
    if [ -f "$tasks_file" ] && [ -s "$tasks_file" ]; then
        # Validate JSON format
        if jq empty "$tasks_file" 2>/dev/null; then
            # Add lastUpdated field if missing
            jq ". + {\"lastUpdated\": \"$current_time\"}" "$tasks_file"
            return 0
        else
            echo "Warning: Invalid JSON in $tasks_file, using sample data" >&2
        fi
    fi
    return 1
}

# Function to initialize workspace tasks file
init_workspace_tasks() {
    # Create directory if it doesn't exist
    mkdir -p "$(dirname "$tasks_file")"
    
    # Generate initial tasks file
    generate_sample_tasks > "$tasks_file"
    echo "Initialized tasks file at $tasks_file" >&2
}

# Function to add a task (for bot integration)
add_task() {
    local title="$1"
    local description="$2"
    local priority="${3:-medium}"
    local due_date="$4"
    
    if [ -z "$title" ]; then
        echo "Error: Task title is required" >&2
        return 1
    fi
    
    # Generate task ID
    local task_id="task_$(date +%s)_$(openssl rand -hex 4 2>/dev/null || echo "$(date +%N)")"
    
    # Create new task object
    local new_task=$(cat <<EOF
{
  "id": "$task_id",
  "title": "$title",
  "description": "$description",
  "priority": "$priority",
  "status": "todo",
  "dueDate": $([ -n "$due_date" ] && echo "\"$due_date\"" || echo "null"),
  "createdAt": "$current_time"
}
EOF
)
    
    # Add to tasks file
    if [ -f "$tasks_file" ]; then
        # Add to existing tasks
        jq ".tasks += [$new_task] | .lastUpdated = \"$current_time\"" "$tasks_file" > "${tasks_file}.tmp" && mv "${tasks_file}.tmp" "$tasks_file"
    else
        # Create new tasks file
        echo "{\"tasks\": [$new_task], \"lastUpdated\": \"$current_time\"}" > "$tasks_file"
    fi
    
    echo "Task added: $title" >&2
}

# Function to mark task as complete (for bot integration)
complete_task() {
    local task_title="$1"
    
    if [ -z "$task_title" ]; then
        echo "Error: Task title is required" >&2
        return 1
    fi
    
    if [ ! -f "$tasks_file" ]; then
        echo "Error: No tasks file found" >&2
        return 1
    fi
    
    # Find and update task
    jq --arg title "$task_title" --arg completed "$current_time" '
        .tasks = (.tasks | map(
            if (.title | test($title; "i")) and .status != "done" then
                . + {"status": "done", "completedAt": $completed}
            else
                .
            end
        )) |
        .lastUpdated = $completed
    ' "$tasks_file" > "${tasks_file}.tmp" && mv "${tasks_file}.tmp" "$tasks_file"
    
    echo "Task completed: $task_title" >&2
}

# Main execution
case "${1:-read}" in
    "add")
        add_task "$2" "$3" "$4" "$5"
        ;;
    "complete")
        complete_task "$2"
        ;;
    "init")
        init_workspace_tasks
        ;;
    "read"|*)
        # Try to read from workspace file, fall back to sample data
        if ! read_workspace_tasks; then
            # Initialize with sample data if no valid file exists
            if [ ! -f "$tasks_file" ]; then
                init_workspace_tasks >/dev/null 2>&1
            fi
            generate_sample_tasks
        fi
        ;;
esac