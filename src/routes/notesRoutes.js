import express from "express"
import Note from "../Models/noteModel.js"
const router=express.Router()


//obtener todas las notas
router.get("/", async (req, res)=>{
    try{

        const notes= await Note.find()
        res.status(200).json(notes)

    }catch(error){

        console.error("Error al obtener las notas", error)
        res.status(500).json({error:"Error al obtener las notas"})

    }
})

//Obtener una nota por id
router.get("/:id", async(req,res)=>{
    try{

        const id=req.params.id
        const note = await Note.findById(id)
        if(!note){ return res.status(404).json({error:"Nota no encontrada"})}
        res.status(200).json(note)


    }catch(error){
        console.error("Error al obtener nota por ID",error)
        res.status(500).json({error:"Error al obtener nota por ID"})
    }
})

router.post("/", async (req,res)=>{
    try{
        const {title, description}=req.body
        const note = new Note({title, description})
        const savedNote = await note.save()
        if(savedNote){res.status(201).json(savedNote)}
        
    }catch(error){
        console.error("error al crear la nota",error)
        res.status(500).json({error:"Error al crear la nota"})
}
}) 

//eliminar una nota
router.delete("/:id", async  (req,res)=>{
   
    try{
        const id=req.params.id
        const deleteNote = await Note.findByIdAndDelete(id)
        if(!deleteNote){ return res.status(404).json({error:"Nota no encontrada"})}
        res.status(200).json({message:"Nota eliminada correctamente"})

    }catch(error){
        console.error("Error al eliminar la nota",error)
        res.status(500).json({error:"Error al eliminar la nota"})
    }
    
})

//editar una nota
router.put("/:id", async (req,res)=>{
  try{
    const id=req.params.id
    const {title, description}=req.body
    const updatedNote = await Note.findByIdAndUpdate(id, {title, description}, {new:true})
    if(!updatedNote){ return res.status(404).json({error:"Nota no encontrada"})}
    res.status(200).json(updatedNote)
  }catch(error){
    console.error("Error al editar la nota",error)
    res.status(500).json({error:"Error al editar la nota"})
  }
})



export default router