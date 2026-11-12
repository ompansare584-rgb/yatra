"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Shown if a child throws. Defaults to nothing, which is right for decorative effects. */
  fallback?: ReactNode;
}

export default class ErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children;
  }
}
