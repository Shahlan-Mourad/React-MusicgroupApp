import React from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function MusicGroupList({ groups }) {
  const navigate = useNavigate();

  return (
    <Card className="shadow-sm mx-auto">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="text-center">Music Groups</th>
            <th className="text-center"></th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.musicGroupId}>
              <td className="text-center">{group.name}</td>
              <td className="text-center">
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => navigate(`/music-groups/${group.musicGroupId}`)}
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