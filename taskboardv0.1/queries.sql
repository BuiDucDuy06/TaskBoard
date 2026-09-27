-- 1. BASE QUERY
SELECT *
FROM tasks;

-- 2. SEARCH
SELECT *
FROM tasks
WHERE title ILIKE '%' || :search || '%';

-- 3. STATUS FILTER
SELECT *
FROM tasks
WHERE status = :status;

-- 4. PRIORITY FILTER
SELECT *
FROM tasks
WHERE priority = :priority;

-- 5. STATUS + PRIORITY
SELECT *
FROM tasks
WHERE status = :status
  AND priority = :priority;

-- 6. SEARCH + STATUS + PRIORITY
SELECT *
FROM tasks
WHERE title ILIKE '%' || :search || '%'
  AND status = :status
  AND priority = :priority;

-- 7. SORT BY CREATED DATE
SELECT *
FROM tasks
ORDER BY created_at DESC;

-- 8. SORT BY DUE DATE
SELECT *
FROM tasks
ORDER BY due_date ASC;

-- 9. SORT BY PRIORITY
SELECT *
FROM tasks
ORDER BY priority ASC;

-- 10. PAGINATION
SELECT *
FROM tasks
ORDER BY created_at DESC
LIMIT 10
OFFSET 10;

-- 11. FULL TASK BOARD QUERY
SELECT *
FROM tasks
WHERE title ILIKE '%' || :search || '%'
  AND status = :status
  AND priority = :priority
ORDER BY due_date ASC
LIMIT 10
OFFSET 10;

-- 12. COUNT TOTAL
SELECT COUNT(*) AS total
FROM tasks
WHERE title ILIKE '%' || :search || '%'
  AND status = :status
  AND priority = :priority;