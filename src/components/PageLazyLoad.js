import React from "react";
import Card from "react-bootstrap/Card";
import "../styles/styles.css";

const PageLazyLoad = ({ text }) => {
    return text.map((page, index) => {
        return (
            <Card className="mt-2 visor-page" id={`page-${index}`} key={`page-${index}`}>
                <Card.Body>
                    <div
                        className="content visor-page-text"
                        dangerouslySetInnerHTML={{ __html: page }}
                    ></div>
                </Card.Body>
                <Card.Footer className="visor-page-footer text-muted">{index}</Card.Footer>
            </Card>
        );
    });
};

export default PageLazyLoad;
