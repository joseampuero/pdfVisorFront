import Card from "react-bootstrap/Card";
import "../styles/styles.css";

const PageLazyLoad = ({ text, onParagraphClick }) => {
    const handlePageClick = (e) => {
        // Detect if the click was on a clickable paragraph
        if (e.target.classList.contains("clickable-paragraph")) {
            const paragraphText = e.target.textContent;
            const paragraphId = e.target.getAttribute("data-paragraph-id");

            // Remove previous selection
            document.querySelectorAll(".clickable-paragraph.selected").forEach((p) => {
                p.classList.remove("selected");
            });

            // Select current paragraph
            e.target.classList.add("selected");

            // Call callback if exists
            if (onParagraphClick) {
                onParagraphClick(paragraphText, paragraphId);
            }
        }
    };

    return text.map((page, index) => {
        return (
            <Card className="mt-2 visor-page" id={`page-${index}`} key={`page-${index}`}>
                <Card.Body>
                    <div
                        className="content visor-page-text"
                        dangerouslySetInnerHTML={{ __html: page }}
                        onClick={handlePageClick}
                    ></div>
                </Card.Body>
                <Card.Footer className="visor-page-footer text-muted">{index}</Card.Footer>
            </Card>
        );
    });
};

export default PageLazyLoad;
