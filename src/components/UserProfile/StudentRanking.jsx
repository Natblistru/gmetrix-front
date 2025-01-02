import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentRanking = () => {
  const [studentRankings, setStudentRankings] = useState([]);
  const [summativeTests, setSummativeTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState("");

  // Fetch summative tests
  useEffect(() => {
    const fetchSummativeTests = async () => {
      try {
        const response = await axios.get('/api/all-summative-tests');
        if (response.data.status === 200) {
          setSummativeTests(response.data.summativeTests);
          if (response.data.summativeTests.length > 0) {
            setSelectedTest(response.data.summativeTests[0].id);
          }
        }
      } catch (error) {
        console.error('Error fetching summative tests:', error);
      }
    };

    fetchSummativeTests();
  }, []);

  // Fetch rankings based on selected test
  useEffect(() => {
    const fetchStudentRankings = async () => {
      if (!selectedTest) return;

      try {
        const response = await axios.get(`/api/student-rankings?summative_test_id=${selectedTest}`);
        setStudentRankings(response.data);
      } catch (error) {
        console.error('Error fetching student rankings:', error);
      }
    };

    fetchStudentRankings();
  }, [selectedTest]);

  const refreshRankings = async () => {
    if (selectedTest) {
      try {
        const response = await axios.get(`/api/student-rankings?summative_test_id=${selectedTest}`);
        setStudentRankings(response.data);
      } catch (error) {
        console.error('Error refreshing student rankings:', error);
      }
    }
  };

  const formatCheltTime = (timeChelt) => {
    const hours = Math.floor(timeChelt / 3600);
    const minutes = Math.floor((timeChelt % 3600) / 60);
    const seconds = timeChelt % 60;

    return `${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="ranking-container">
      <header className="ranking-header">
        <h1>Clasamentul Studenților</h1>
        <p>Clasament bazat pe punctaj și timp utilizat.</p>
      </header>

      <table className="ranking-table">
        <thead>
          <tr>
            <th>Loc</th>
            <th>Nume Student</th>
            <th>Scor Total, %</th>
            <th>Timp utilizat (minute)</th>
          </tr>
        </thead>
        <tbody>
          {studentRankings.map((student, index) => (
            <tr key={student.student_id}>
              <td>{index + 1}</td>
              <td>{student.student_name}</td>
              <td>{student.total_score}</td>
              <td>{formatCheltTime(student.timeTest)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="ranking-actions">
        <div className="select-container">
          <label htmlFor="summative-test-select">Selectează Testul Sumativ:</label>
          <select
            id="summative-test-select"
            value={selectedTest}
            onChange={(e) => setSelectedTest(e.target.value)}
          >
            {summativeTests.map((test) => (
              <option key={test.id} value={test.id}>
                {test.title }
              </option>
            ))}
          </select>
        </div>
        <button onClick={refreshRankings} className="refresh-button">
          Reîmprospătează
        </button>
      </div>
    </div>
  );
};

export default StudentRanking;