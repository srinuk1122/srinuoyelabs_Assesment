<!-- 2. Refer to the tables below, Write a sql query for finding the subjects for each student, the subjects should be order by alphabetically . -->

SELECT c.customerId, c.name, GROUP_CONCAT(s.subjectName ORDER BY s.subjectName ASC SEPARATOR ', ') AS subjects
FROM customers c
JOIN mapping m ON c.customerId = m.customerId
JOIN subjects s ON m.subjectId = s.subjectId
GROUP BY c.customerId, c.name
ORDER BY c.name ASC;