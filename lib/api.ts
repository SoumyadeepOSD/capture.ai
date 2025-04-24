/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetchNotes(): Promise<any[]>{
    const res = await fetch("/api/notes", {cache:"no-store"});
    if(!res.ok) throw new Error("Failed to fetch notes");
    return res.json();
};

export async function deleteNote(id: string){
    const res = await fetch(`/api/notes/delete/${id}`,{method:"POST"});
    if(!res.ok) throw new Error("Failed to delete more"); 
}