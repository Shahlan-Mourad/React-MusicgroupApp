import React from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function MusicGroupList({ groups }) {
  const navigate = useNavigate();

  return (
    <Card className="shadow-sm">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.musicGroupId}>
              <td>{group.name}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => navigate(`/groups/${group.musicGroupId}`)}
                >
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}

export default MusicGroupList; 