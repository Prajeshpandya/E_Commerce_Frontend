import { useEffect, useRef } from "react";
interface ZoomImageProps {
  src: string;
  alt?: string;
}

type VisibilityValues = "block" | "none";

function ZoomImage({
  src,
  alt,
  ...rest
}: ZoomImageProps & React.HTMLProps<HTMLImageElement>) {
  const imageBoxRef = useRef<HTMLDivElement | null>(null);
  const imageDetailRef = useRef<HTMLDivElement | null>(null);

  // functions for ImageBox container.
  function handleMouseEnterEventListener(event: MouseEvent) {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    updateImageDetailVisibility("block");
    updateImageDetailBackgroundImage(src);
    updateImageDetailPosition(rect);
  }
  function handleMouseMoveEventListener(event: MouseEvent) {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    updateImageDetailBackgroundPosition(rect, event.offsetX, event.offsetY);
  }
  function handleMouseLeaveEventListener(event: MouseEvent) {
    updateImageDetailVisibility("none");
    updateImageDetailBackgroundImage("");
  }

  // functions for ImageDetail container.
  function updateImageDetailPosition(imageBoxRect: DOMRect) {
    if (imageDetailRef.current !== null) {
      const imageDetailRect = imageDetailRef.current.getBoundingClientRect();

      imageDetailRef.current.style.left =
        imageBoxRect.left + imageBoxRect.width + "px";
      imageDetailRef.current.style.top = imageBoxRect.top + "px";
      const horizontal_gap =
        window.innerWidth - (imageBoxRect.left + imageBoxRect.width);

      if (horizontal_gap < imageDetailRect.width) {
        imageDetailRef.current.style.left =
          imageBoxRect.left - imageDetailRect.width + "px";
      }
    }
  }
  function updateImageDetailVisibility(visibility: VisibilityValues) {
    if (imageDetailRef.current !== null) {
      imageDetailRef.current.style.display = visibility;
      return;
    }
  }
  function updateImageDetailBackgroundImage(src: string) {
    if (imageDetailRef.current !== null) {
      imageDetailRef.current.style.backgroundImage = `url(${src})`;
    }
  }
  function updateImageDetailBackgroundPosition(
    imageBoxRect: DOMRect,
    x: number,
    y: number
  ) {
    if (imageDetailRef.current !== null) {
      const new_x = (x / imageBoxRect.width) * 100;
      const new_y = (y / imageBoxRect.height) * 100;
      imageDetailRef.current.style.backgroundPositionX = new_x + "%";
      imageDetailRef.current.style.backgroundPositionY = new_y + "%";
    }
  }

  useEffect(() => {
    const imageBoxRefElement = imageBoxRef.current;
    if (imageBoxRefElement === null) {
      return;
    }

    imageBoxRefElement.addEventListener(
      "mouseenter",
      handleMouseEnterEventListener
    );
    imageBoxRefElement.addEventListener(
      "mousemove",
      handleMouseMoveEventListener
    );
    imageBoxRefElement.addEventListener(
      "mouseleave",
      handleMouseLeaveEventListener
    );

    return () => {
      imageBoxRefElement.removeEventListener(
        "mouseenter",
        handleMouseEnterEventListener
      );
      imageBoxRefElement.removeEventListener(
        "mousemove",
        handleMouseMoveEventListener
      );
      imageBoxRefElement.removeEventListener(
        "mouseleave",
        handleMouseLeaveEventListener
      );
    };
  }, []);

  return (
    <div className="zoom-image">
      <div className="image-box" ref={imageBoxRef}>
        <img src={src} alt={alt ?? ""} {...rest} />
      </div>
      <div className="image-detail" ref={imageDetailRef}></div>
    </div>
  );
}

export default ZoomImage;
