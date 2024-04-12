import React, { useState, useEffect } from 'react';
import MakeupDataService from "../services/makeupDataService";
import { Link } from "react-router-dom";
import { Form, Button, Col, Row, Container, Card } from 'react-bootstrap';

const MakeupList = () => {
  const [makeup, setMakeup] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [ratings, setRatings] = useState(["All Ratings"]);

  useEffect(() => {
    retrieveMakeup();
    retrieveRatings();
  }, []);

  const retrieveMakeup = () => {
    MakeupDataService.getAll()
      .then((response) => {
        console.log(response.data);
        setMakeup(response.data.makeup);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const retrieveRatings = () => {
    MakeupDataService.getRatings()
      .then((response) => {
        console.log(response.data);
        setRatings(["All Ratings"].concat(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onChangeSearchTitle = (event) => {
    const searchTitle = event.target.value;
    setSearchTitle(searchTitle);
  };

  const onChangeSearchRating = (event) => {
    const searchRating = event.target.value;
    setSearchRating(searchRating);
  };

  const find = (query, by) => {
    MakeupDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setMakeup(response.data.makeup);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const findByTitle = () => {
    setSearchRating("");
    find(searchTitle, "title");
  };

  const findByRating = () => {
    setSearchTitle("");
    if (searchRating === "All Ratings") {
      retrieveMakeup();
    } else {
      find(searchRating, "rated");
    }
  };

  return (
    <div>
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={findByTitle}
              >
                Search
              </Button>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  as="select"
                  onChange={onChangeSearchRating}
                >
                  {ratings.map(rating => (
                    <option key={rating} value={rating} selected={rating === searchRating}>{rating}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={findByRating}
              >
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <Row>
          {makeup.map((item) => (
            <Col key={item.id}>
              <Card style={{ width: '18rem' }}>
                <Card.Img src={item.image} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    Rating: {item.rated}
                  </Card.Text>
                  <Card.Text>{item.description}</Card.Text>
                  <Link to={`/makeup/${item.id}`}>View Details</Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default MakeupList;
