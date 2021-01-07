export interface CoursePartBase {
    name: string;
    exercisesCount: number;
}

interface CoursePartBaseWithDescription extends CoursePartBase {
    description: string;
}

interface CoursePartOne extends CoursePartBaseWithDescription {
    name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseWithDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;