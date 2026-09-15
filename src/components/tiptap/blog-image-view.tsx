"use client";

import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";

export function BlogImageView({ node, deleteNode, selected }: NodeViewProps) {
  return (
    <NodeViewWrapper
      className="blog-image"
      data-selected={selected ? "true" : "false"}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={node.attrs.src} alt={node.attrs.alt || ""} />
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          deleteNode();
        }}
        className="blog-image-delete"
      >
        Supprimer
      </button>
    </NodeViewWrapper>
  );
}
