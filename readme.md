# Installed features
1. node
2. tsx for running
3. typescript
4.express
5. postgresql

🗄️ Database Schema Design
Table 1: users
Field	Requirement (Plain Text)
id	Auto-incrementing unique identifier for each account
name	Full display name of the team member, must be provided
email	Valid login address, must be unique across all accounts, must be provided
password	Encrypted string stored securely, must be provided during registration, never returned in responses
role	Determines system access level, defaults to contributor, must be contributor or maintainer
created_at	Timestamp marking when the account was created, automatically generated on insert
updated_at	Timestamp marking when the account was last updated, automatically refreshed on update
Table 2: issues
Field	Requirement (Plain Text)
id	Auto-incrementing unique identifier for each reported item
title	Short descriptive headline, must be provided, maximum 150 characters
description	Detailed explanation of the problem or suggestion, must be provided, minimum 20 characters
type	Categorizes the entry, must be either bug or feature_request
status	Current workflow state, defaults to open. Status must be one of: open, in_progress, resolved
reporter_id	References the user who submitted the issue (no foreign key constraint required; validate in application logic)
created_at	Timestamp marking when the issue was created, automatically generated on insert
updated_at	Timestamp marking when the issue was last updated, automatically refreshed on update