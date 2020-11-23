import React from "react";

export default function Total({ course }) {
    const total = course.parts.reduce((current, { exercises }) =>
    current + exercises, 0);

    return (
        <p id="total">total of {total} exercises</p>
    );
}