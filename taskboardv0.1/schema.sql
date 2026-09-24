CREATE DATABASE project_management;

CREATE TABLE tasks (
    id INTEGER PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'TODO',
    priority VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',
    due_date DATE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- INSERT
INSERT INTO tasks (
    id,
    title,
    description,
    status,
    priority,
    due_date
)
VALUES (
    1,
    'Setup NestJS project',
    'Create the initial NestJS backend',
    'TODO',
    'HIGH',
    '2026-09-20'
);

INSERT INTO tasks (
    id,
    title,
    description,
    status,
    priority,
    due_date
)
VALUES (
    2,
    'Build task board',
    'Implement the task board UI',
    'IN_PROGRESS',
    'MEDIUM',
    '2026-09-22'
);

-- SELECT
SELECT *
FROM tasks;

SELECT *
FROM tasks
WHERE id = 1;

-- UPDATE
UPDATE tasks
SET
    status = 'DONE',
    updated_at = CURRENT_TIMESTAMP
WHERE id = 1;

-- Verify UPDATE
SELECT *
FROM tasks
WHERE id = 1;

-- DELETE
DELETE FROM tasks
WHERE id = 2;

SELECT *
FROM tasks;