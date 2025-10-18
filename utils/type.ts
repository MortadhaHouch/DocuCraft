export type Feature = {
    icon: React.ReactNode;
    title: string;
    description: string;
}
export enum Extension {
    PDF="pdf",
    DOCX="docx",
    HTML="html"
}
export type Sort = {
  criteria:"title"|"description"|"createdAt"|"updatedAt"|"downloads"|"pinned",
  direction:"asc"|"desc"
}