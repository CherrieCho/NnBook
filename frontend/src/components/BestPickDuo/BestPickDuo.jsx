import React, { useState, useEffect } from "react";
import "./styles/BestPickDuo.style.css";
import useBlogBest from "../../hooks/Recommend/useBlogBest";
import useNewSpecialBest from "../../hooks/Recommend/useNewSpecialBest";
import { Row, Col } from "react-bootstrap";
import useBookByID from "../../hooks/Common/useBookbyID";

const BestPickDuo = () => {
  const { data: blogData } = useBlogBest();
  const { data: NewSpecialData } = useNewSpecialBest();

  const [itemId, setItemId] = useState(null);

  useEffect(() => {
    if (NewSpecialData && NewSpecialData[0]) {
      setItemId(NewSpecialData[0].itemId);
    }
  }, [NewSpecialData]);

  const { data: bookbyidData } = useBookByID(itemId);

  if (!blogData || !blogData[0] || !NewSpecialData || !NewSpecialData[0]) {
    return null;
  }

  console.log("blog", blogData);
  console.log("new", NewSpecialData);
  console.log("new", bookbyidData);

  return (
    <div className="best-pick-duo-container">
      <Row xs={2} sm={2} md={2}>
        <Col>
          <h1 className="best-pick-duo-title">오늘의 책</h1>
          <div className="best-pick-today-info-area">
            <img
              src={NewSpecialData[0].cover.replace("/cover500/", "/coversum/")}
              alt={NewSpecialData[0].title}
              className="best-pick-blog-book-img"
            />
            <div>
              <h3 className="best-pick-book-title">
                {NewSpecialData[0].title.split("-")[0]}
              </h3>
              <p className="best-pick-book-author">
                {NewSpecialData[0].author.split("(")[0]}
              </p>
              <p className="best-pick-book-publisher">
                {NewSpecialData[0].publisher.split("(")[0]}
              </p>
              <p className="best-pick-book-description">
                {bookbyidData?.description}
              </p>
            </div>
          </div>
        </Col>
        <Col>
          <h1 className="best-pick-duo-title">블로거 픽</h1>
          <div className="best-pick-blog-info-area">
            <img
              src={blogData[0].cover.replace("/cover500/", "/coversum/")}
              alt={blogData[0].title}
              className="best-pick-book-img"
            />
            <div>
              <h3 className="best-pick-book-title">
                {blogData[0].title.split("-")[0]}
              </h3>
              <p className="best-pick-book-author">
                {blogData[0].author.split("(")[0]}
              </p>
              <p className="best-pick-book-publisher">
                {blogData[0].publisher.split("(")[0]}
              </p>
              <p className="best-pick-book-description">
                {blogData[0].description}
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BestPickDuo;
