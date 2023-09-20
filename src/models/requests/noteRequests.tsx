class GetNotesByCriteriaRequest {
  userIdWeb: string = "";
  tagsIncluded: string = "";
  isArchived: boolean = false;
}

class AddUpdateNoteRequest {
  noteIdWeb: string = "";
  userIdWeb: string = "";
  content: string = "";
  tagsNames: string[] = [];
  isArchived: boolean = false;
}

export { GetNotesByCriteriaRequest, AddUpdateNoteRequest };