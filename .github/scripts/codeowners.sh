#!/bin/bash

# Ensure that a GitHub username is provided as input
if [ -z "$1" ]; then
    echo "Usage: $0 <github-username>"
    exit 1
fi

INPUT_USER="$1"
CODEOWNERS_FILE=".github/CODEOWNERS"

# Function to resolve team members
resolve_team_members() {
    local team_slug="$1"
    local org="$2"
    local members

    # gh api already handles nested orgs
    members=$(gh api "orgs/$org/teams/$team_slug/members" --jq '.[].login')
    echo "$members"
}

# Parse CODEOWNERS file
users=()
if [ -f "$CODEOWNERS_FILE" ]; then
    while IFS= read -r line; do
        echo "Processing line: $line"  # Debugging output
        [[ $line =~ ^#.*$ ]] && continue
        [[ $line =~ ^[[:space:]]*$ ]] && continue

        for item in $line; do
            if [[ $item == @*/* ]]; then
                # It's a team
                team_org=$(echo $item | cut -d'/' -f1 | cut -d'@' -f2)
                team_slug=$(echo $item | cut -d'/' -f2)
                echo "Resolving team: $team_org/$team_slug"  # Debugging output
                team_members=$(resolve_team_members "$team_slug" "$team_org")
                users+=($team_members)
            elif [[ $item == @* ]]; then
                # It's a user
                users+=("${item:1}")
            fi
        done
    done < "$CODEOWNERS_FILE"
else
    echo "CODEOWNERS file not found."
    exit 1
fi

# Remove duplicate users and sort the list
unique_users=($(echo "${users[@]}" | tr ' ' '\n' | sort -u | tr '\n' ' '))

# Output the list of flat users
echo "Flat list of users:"
for user in "${unique_users[@]}"; do
    echo "$user"
done

# Check if the input user is in the list of resolved users
if [[ " ${users[@]} " =~ " $INPUT_USER " ]]; then
    echo "User $INPUT_USER is in the CODEOWNERS list."
    exit 0
else
    echo "User $INPUT_USER is NOT in the CODEOWNERS list."
    exit 1
fi