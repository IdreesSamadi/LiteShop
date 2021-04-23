import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import { Link, RouteComponentProps } from 'react-router-dom'

import ProductModel from '../Models/product'
import Rating from '../components/Rating'

interface Props extends RouteComponentProps<{ id: string }> {}

const ProductScreen: React.FC<Props> = ({ match }) => {
  const [product, setProduct] = useState<ProductModel>()

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/product/${match.params.id}`)
      setProduct(data)
    }
    fetchProduct()
  }, [match])

  return (
    <>
      {product ? (
        <div>
          <Link className="btn btn-light my-3" to="/">
            Go Back
          </Link>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    text={`${product.numReviews} reviews`}
                    value={product.rating}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: ${product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button block disabled={product.countInStock === 0}>
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </div>
      ) : null}
    </>
  )
}

export default ProductScreen
