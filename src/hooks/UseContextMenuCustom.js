import { useEffect, useCallback, useState } from "react";

const useContextMenuCustom = () => {
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const [show, setShow] = useState(false);
    const [bufferText, setBufferText] = useState(null);

    const handleContextMenu = useCallback(
        (event) => {
            event.preventDefault();
            setAnchorPoint({ x: event.pageX, y: event.pageY });
            setShow(true);
        },
        [setShow, setAnchorPoint]
    );

    const handleClick = useCallback(() => (show ? setShow(false) : null), [show]);

    const handleBuffer = () => {
        const selectedText = window.getSelection().toString();
        console.log("handleBuffer:", selectedText);
        setBufferText(selectedText);
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);
        document.addEventListener("contextmenu", handleContextMenu);
        handleBuffer();
        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    });
    return { anchorPoint, show, bufferText };
};

export default useContextMenuCustom;
