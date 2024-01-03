import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouteGuard } from 'src/app/core/route.guard';
import { ArgumentService } from 'src/app/services/argument.service';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorsComponent } from 'src/app/shared/errors/errors.component';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit{

daFare:string='aggiungiStoria';
fontSizee:string='fs-1'
fontWeight:boolean=false
fontStyle:boolean=false
textAlign:string='start'
articoloForm!:FormGroup
categorie:any[]=[]
temi:any[]=[]
tags:any[]=[]
luoghi:any[]=[]
personaggi:any[]=[]
addCategoria!:FormGroup
addTag!:FormGroup
addTema!:FormGroup
addLuogo!:FormGroup
addPersonaggio!:FormGroup
constructor(private argument:ArgumentService,private auth:RouteGuard,private router:Router,private dialog:MatDialog){}

ngOnInit(): void {
this.articoloForm=new FormGroup({
  titolo:new FormControl('',Validators.required),
  categoriaList:new FormControl(''),
  temaList:new FormControl(''),
  luogo:new FormControl(''),
  tagList:new FormControl(''),
  testo:new FormControl('',Validators.required),
  image:new FormControl(''),
  personaggioList:new FormControl('')
})
this.addCategoria= new FormGroup({
addCategoria:new FormControl('',Validators.required)
})
this.addTag= new FormGroup({
  addTag:new FormControl('',Validators.required)
  })
  this.addTema= new FormGroup({
    addTema:new FormControl('',Validators.required)
    })
    this.addLuogo= new FormGroup({
      addLuogo:new FormControl('',Validators.required)
      })
this.addPersonaggio= new FormGroup({
  name:new FormControl('',Validators.required),
  surname:new FormControl('',Validators.required),
  alias:new FormControl('',Validators.required)
})
this.getAll()
}

logout(){
  localStorage.clear()
  this.auth.authenticateUser(false)
  this.router.navigate(['/login'])
}

addCategory(){
if(this.addCategoria.valid){
  this.argument.saveCategoria(
    {category:this.addCategoria.controls['addCategoria'].value}
  ).subscribe((data:any)=>{
this.getAll()
this.addCategoria.reset()
  },err=>{
this.openDialog()  })
}else{
  this.openDialog({})
}
}
addThema(){
  if(this.addTema.valid){
    console.log(this.addTema.controls['addTema'].value)
    this.argument.saveTema(
      {thema:this.addTema.controls['addTema'].value}
    ).subscribe((data:any)=>{
  this.getAll()
  this.addTema.reset()
    },err=>{
  this.openDialog()  })
  }else{
    this.openDialog({})
  }
}
addTags(){
  if(this.addTag.valid){
    this.argument.saveTag(
      {tag:this.addTag.controls['addTag'].value}
    ).subscribe((data:any)=>{
  this.getAll()
  this.addTag.reset()
    },err=>{
  this.openDialog()  })
  }else{
    this.openDialog({})
  }
}
addPlace(){
  if(this.addLuogo.valid){
    this.argument.saveLuogo(
      {luogo:this.addLuogo.controls['addLuogo'].value}
    ).subscribe((data:any)=>{
  this.getAll()
  this.addLuogo.reset()
    },err=>{
  this.openDialog()  })
  }else{
    this.openDialog({})
  }
}
addCharacter(){
  console.log(this.addPersonaggio)
  if(this.addPersonaggio.valid){
    this.argument.savePersonaggio(
      {name:this.addPersonaggio.controls['name'].value,
      surname:this.addPersonaggio.controls['surname'].value,
      alias:this.addPersonaggio.controls['alias'].value}
    ).subscribe((data:any)=>{
  this.getAll()
  this.addPersonaggio.reset()
    },err=>{
  this.openDialog()  })
  }else{
    this.openDialog({})
  }
}
getAll(){
  this.argument.getAllCategoria().subscribe((data:any)=>{
    if(data){
      this.categorie=data
    }
  })
  this.argument.getAllTag().subscribe((data:any)=>{
    if(data){
      this.tags=data
    }
  })
  this.argument.getAllTema().subscribe((data:any)=>{
    if(data){
      this.temi=data
    }
  })
  this.argument.getAllLuogo().subscribe((data:any)=>{
    if(data){
      this.luoghi=data
    }
  })
  this.argument.getAllPersonaggio().subscribe((data:any)=>{
    if(data){
      this.personaggi=data
    }
  })
}
openDialog(error?:any){
  let err={}
  if(!error){
  err={
    error:{
message:"Qualcosa è andato storto nel salvataggio"
    }
  }
}else{
  err={
    error:{
message:"Stai dimenticando di inserire il valore"
    }
  }
}
const dialogRef = this.dialog.open(ErrorsComponent,{
  data:err
})
dialogRef.afterClosed().subscribe((data:any)=>{
  console.log(data)
})
}
}
