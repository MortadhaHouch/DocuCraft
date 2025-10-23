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
export type Tab = {
    value: TabName;
    label: string;
    content: React.ReactNode;
}
export type TabName = "Edit" | "Share" | "Save" | "Style" | "table" | "Insert"
export type EditorConfig = {
    title: string
    isPinned: boolean
    isArchived: boolean
    isDeleted: boolean
    permission: Permission
    saveInterval: SaveEvery
    autoSave: boolean
}
export enum Permission {
  VIEW="VIEW",
  COMMENT="COMMENT",
  EDIT="EDIT",
  MANAGE="MANAGE"
}
export enum SaveEvery {
  THIRTY_SECONDS="THIRTY_SECONDS",
  MINUTE="MINUTE",
  FIVE_MINUTES="FIVE_MINUTES",
  TEN_MINUTES="TEN_MINUTES",
  THIRTY_MINUTES="THIRTY_MINUTES",
  HOUR="HOUR"
}