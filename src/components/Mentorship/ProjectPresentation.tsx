import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, ChevronLeft, ChevronRight, Download, X } from "lucide-react";
import type { MentorshipProject } from "../../data/mentorshipProjects";
import slideManifest from "../../data/mentorship-slides.json";

const slidesByProject: Record<string, { image: string; text: string }[]> = slideManifest;

// Mounted inside Dialog.Content so closing a viewer also resets its slide state.
function PresentationBody({ project }: { project: MentorshipProject }) {
  const [index, setIndex] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const slides = slidesByProject[project.id] ?? [];
  const slide = slides[index];
  function changeSlide(next: number) {
    setIndex(next);
    setImageFailed(false);
  }
  return (
    <>
      <Dialog.Title className="mentorship-viewer-title">{project.title}</Dialog.Title>
      <Dialog.Description className="mentorship-viewer-description">
        {project.description}
      </Dialog.Description>
      {slide ? (
        <div
          className="mentorship-slides"
          role="region"
          aria-label={`${project.title} slides`}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              changeSlide(
                Math.max(
                  0,
                  Math.min(slides.length - 1, index + (event.key === "ArrowRight" ? 1 : -1))
                )
              );
            }
          }}
        >
          <div className="mentorship-slide-image">
            {imageFailed ? (
              <p>
                We couldn’t load this slide. Read the slide text below or download the presentation.
              </p>
            ) : (
              <img
                key={slide.image}
                src={slide.image}
                alt={`${project.title}, slide ${index + 1}. Text available below.`}
                onError={() => setImageFailed(true)}
              />
            )}
          </div>
          <div className="mentorship-slide-controls">
            <button
              type="button"
              aria-label="Previous slide"
              disabled={index === 0}
              onClick={() => changeSlide(index - 1)}
            >
              <ChevronLeft size={20} />
            </button>
            <span role="status">
              Slide {index + 1} of {slides.length}
            </span>
            <button
              type="button"
              aria-label="Next slide"
              disabled={index === slides.length - 1}
              onClick={() => changeSlide(index + 1)}
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <details className="mentorship-slide-transcript">
            <summary>Read slide text</summary>
            <p>
              {slide.text ||
                "This slide contains visual content. Open the original presentation for more detail."}
            </p>
          </details>
        </div>
      ) : project.format === "pptx" ? (
        <div className="mentorship-led-demo">
          <video
            controls
            preload="none"
            playsInline
            aria-label="LED Strip Controller demonstration"
            poster="/mentorship/led-controller/cover.webp"
          >
            <source src="/mentorship/led-controller/demo.mp4" type="video/mp4" />
            <p>
              Your browser cannot play this video. Download the presentation below to view the
              demonstration.
            </p>
          </video>
          <p>
            Demo from Millie’s presentation: a web interface controls the LED strip over Wi-Fi.
            Download the PowerPoint for all seven slides. The original Drive link may require
            access.
          </p>
        </div>
      ) : (
        <div className="mentorship-external-preview">
          <p>
            This presentation is available on Canva. Open the original to view the complete deck.
          </p>
          <a
            className="mentorship-button primary"
            href={project.original}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Canva <ArrowUpRight size={18} />
          </a>
        </div>
      )}
      <div className="mentorship-viewer-links">
        {project.format !== "external" && (
          <a href={`/mentorship/${project.id}/presentation.${project.format}`} download>
            <Download size={16} /> Download {project.format.toUpperCase()}
          </a>
        )}
        <a href={project.original} target="_blank" rel="noopener noreferrer">
          Open original <ArrowUpRight size={16} />
        </a>
        {project.repository && (
          <a href={project.repository} target="_blank" rel="noopener noreferrer">
            View code <ArrowUpRight size={16} />
          </a>
        )}
      </div>
    </>
  );
}

export default function ProjectPresentation({ project }: { project: MentorshipProject }) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="mentorship-viewer-overlay" />
      <Dialog.Content className="mentorship-viewer">
        <PresentationBody project={project} />
        <Dialog.Close className="mentorship-viewer-close" aria-label="Close presentation">
          <X size={22} />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
