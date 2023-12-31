import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RouteGuard } from 'src/app/core/route.guard';
import { ArgumentService } from 'src/app/services/argument.service';
import { ErrorsComponent } from 'src/app/shared/errors/errors.component';
import { SearchComponent } from 'src/app/shared/search/search.component';
import { ViewArticoloComponent } from 'src/app/shared/view-articolo/view-articolo.component';
import { forwardRef } from '@angular/core';
import { ViewBozzaComponent } from 'src/app/shared/view-bozza/view-bozza.component';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit, AfterViewInit{

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
searchCategory!:FormGroup
searchTag!:FormGroup
searchTema!:FormGroup
searchLuogo!:FormGroup
searchPersonaggio!:FormGroup
selectedCategories:any[]=[]
selectedThemas:any[]=[]
selectedTags:any[]=[]
selectedCharacters:any[]=[]
articles:any[]=[]
displayedColumns: string[] = ['id', 'titolo', 'luogo', 'created_at','vedi'];
dataSource = new MatTableDataSource<any>();
dataSource1 = new MatTableDataSource<any>();
totalArticles:number=0;
totalBozzas:number=0;
visits:number=0
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild('paginator1') paginator1!: MatPaginator;

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource1.paginator = this.paginator1;
this.updateDatasource(this.paginator.pageIndex,this.paginator.pageSize,'id')
this.updateDatasource1(this.paginator.pageIndex,this.paginator.pageSize,'id')
this.homeService.getAllVisit().subscribe((data:any)=>{this.visits=data.length})
}

constructor(private argument:ArgumentService,private auth:RouteGuard,private router:Router,
  private homeService:HomeService,private dialog:MatDialog,@Inject(forwardRef(() => ToastrService)) private toastr: ToastrService){}

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
this.searchCategory= new FormGroup({
searchCategory:new FormControl('',Validators.required)
  })
  this.searchTag= new FormGroup({
  searchTag:new FormControl('',Validators.required)
    })
    this.searchTema= new FormGroup({
    searchTema:new FormControl('',Validators.required)
      })
      this.searchLuogo= new FormGroup({
      searchLuogo:new FormControl('',Validators.required)
        })
  this.searchPersonaggio= new FormGroup({
    searchAlias:new FormControl('',Validators.required)
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
this.openDialog(err)  })
}else{
  let err={
    error:{
message:"Stai dimenticando di inserire il valore"
    }
  }
  this.openDialog(err)}
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
  this.openDialog(err)  })
  }else{
    let err={
      error:{
  message:"Stai dimenticando di inserire il valore"
      }
    }
    this.openDialog(err)  }
}
addTags(){
  if(this.addTag.valid){
    this.argument.saveTag(
      {tag:this.addTag.controls['addTag'].value}
    ).subscribe((data:any)=>{
  this.getAll()
  this.addTag.reset()
    },err=>{
  this.openDialog(err)  })
  }else{
    let err={
      error:{
  message:"Stai dimenticando di inserire il valore"
      }
    }
    this.openDialog(err)  }
}
addPlace(){
  if(this.addLuogo.valid){
    this.argument.saveLuogo(
      {luogo:this.addLuogo.controls['addLuogo'].value}
    ).subscribe((data:any)=>{
  this.getAll()
  this.addLuogo.reset()
    },err=>{
  this.openDialog(err)  })
  }else{
    let err={
      error:{
  message:"Stai dimenticando di inserire il valore"
      }
    }
    this.openDialog(err)
  }
}
addCharacter(){
  if(this.addPersonaggio.valid){
    this.argument.savePersonaggio(
      {name:this.addPersonaggio.controls['name'].value,
      surname:this.addPersonaggio.controls['surname'].value,
      alias:this.addPersonaggio.controls['alias'].value}
    ).subscribe((data:any)=>{
  this.getAll()
  this.addPersonaggio.reset()
    },err=>{
  this.openDialog(err)  })
  }else{
   let err={
      error:{
  message:"Stai dimenticando di inserire il valore"
      }
    }
    this.openDialog(err)
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

const dialogRef = this.dialog.open(ErrorsComponent,{
  data:error
})
dialogRef.afterClosed().subscribe((data:any)=>{
  console.log(data)
})
}
search(parameter:string,value:string){
  if(value!=''){
    const dialogRef=this.dialog.open(SearchComponent,{
  data:[parameter,value]
 })
 dialogRef.afterClosed().subscribe((data:any)=>{
  this.searchCategory.reset()
  this.searchLuogo.reset()
  this.searchPersonaggio.reset()
  this.searchTag.reset()
  this.searchTema.reset() })
  }else{
    let err ={ error:{message:'Non stai inserendo un valore'}}
    const dialogRef = this.dialog.open(ErrorsComponent,{data:err})
    dialogRef.afterClosed().subscribe((data:any)=>{
    })
  }
}

posta(){
if(this.articoloForm.valid){
let categories :any[]=[];
let temi:any[]=[];
let tags:any[]=[];
let personaggi:any[]=[]
let immagini:any[]=[]
for(let i of this.selectedCategories){
categories.push(i.id)
}
  for(let i of this.selectedTags){
    tags.push(i.id)
    }
    for(let i of this.selectedThemas){
      temi.push(i.id)
      }
      for(let i of this.selectedCharacters){
        personaggi.push(i.id)
        }

  this.argument.saveArticolo(
{
titolo:this.articoloForm.controls['titolo'].value,
testo:this.articoloForm.controls['testo'].value,
category_id:categories,
theme_id:temi,
tag_id:tags,
luogo_id:this.articoloForm.controls['luogo'].value,
imageList:immagini,
personaggio_id:personaggi
}
  ).subscribe((data:any)=>{this.articoloForm.reset()
  this.selectedCategories=[]
this.selectedCharacters=[]
this.selectedTags=[]
this.selectedThemas=[]},err=>{
    console.log(err)
  });
}
}
salvaBozza(){
  let categories :any[]=[];
let temi:any[]=[];
let tags:any[]=[];
let personaggi:any[]=[]
let immagini:any[]=[]
for(let i of this.selectedCategories){
categories.push(i.id)
}
  for(let i of this.selectedTags){
    tags.push(i.id)
    }
    for(let i of this.selectedThemas){
      temi.push(i.id)
      }
      for(let i of this.selectedCharacters){
        personaggi.push(i.id)
        }

this.argument.saveBozza({
  titolo:this.articoloForm.controls['titolo'].value,
  testo:this.articoloForm.controls['testo'].value,
  category_id:categories,
  theme_id:temi,
  tag_id:tags,
  luogo_id:this.articoloForm.controls['luogo'].value,
  imageList:immagini,
  personaggio_id:personaggi
  }).subscribe((data:any)=>{
    this.toastr.success("Bozza salvata con successo");
this.articoloForm.reset()
})
}
addToSelectedCategories(id:string){
  let item:any
  this.categorie.forEach(c=>{
    if(c.id==Number(id)){
      item=c
    }
  })
  let bool=false
  this.selectedCategories.forEach(c=>{
    if(c.id==item.id){
      bool=true
    }
  })
if(bool==false){
  this.selectedCategories.push(item)
}
}
addToSelectedThemas(id:string){
  let item:any
  this.temi.forEach(c=>{
    if(c.id==Number(id)){
      item=c
    }
  })
  let bool=false
  this.selectedThemas.forEach(c=>{
    if(c.id==item.id){
      bool=true
    }
  })
if(bool==false){
  this.selectedThemas.push(item)
}
}
addToSelectedTags(id:string){
  let item:any
  this.tags.forEach(c=>{
    if(c.id==Number(id)){
     item=c
    }
  })
  let bool=false
  this.selectedTags.forEach(c=>{
    if(c.id==item.id){
      bool=true
    }
  })
if(bool==false){
  this.selectedTags.push(item)
}
}
addToSelectedCharacters(id:string){
  let item:any
  this.personaggi.forEach(c=>{
    if(c.id==Number(id)){
      item=c
    }
  })
  let bool=false
  this.selectedCharacters.forEach(c=>{
    if(c.id==item.id){
      bool=true
    }
  })
if(bool==false){
  this.selectedCharacters.push(item)
}
}
removeItemFromSelectedCategories(id:number){
this.selectedCategories=this.selectedCategories.filter(c=>c.id!=id)
}
removeItemFromSelectedTags(id:number){
this.selectedTags=this.selectedTags.filter(c=>c.id!=id)
}
removeItemFromSelectedThemas(id:number){
this.selectedThemas=this.selectedThemas.filter(c=>c.id!=id)
}
removeItemFromSelectedCharacters(id:number){
this.selectedCharacters=this.selectedCharacters.filter(c=>c.id!=id)
}



updateDatasource(page?:number,size?:number,orderBy?:string){

  this.argument.getAllArticolo(page||this.paginator.pageIndex,size||this.paginator.pageSize,orderBy||'id').subscribe((data:any)=>{
    this.totalArticles=data.totalElements
  this.dataSource=data.content
  this.paginator.length=data.content.length
  })
}
updateDatasource1(page?:number,size?:number,orderBy?:string){

  this.argument.getAllBozza(page||this.paginator.pageIndex,size||this.paginator.pageSize,orderBy||'id').subscribe((data:any)=>{
    this.totalBozzas=data.totalElements
  this.dataSource1=data.content
  this.paginator1.length=data.content.length
  })
}
vediStoria(articolo:any,param:string){
  if(param=='articolo'){
const dialogRef = this.dialog.open(ViewArticoloComponent,{data:[articolo,{categorie:this.categorie,luoghi:this.luoghi,tags:this.tags,temi:this.temi,personaggi:this.personaggi}]})
dialogRef.afterClosed().subscribe((data:any)=>{this.updateDatasource(this.paginator.pageIndex,this.paginator.pageSize,'id')})
  }else{
    const dialogRef = this.dialog.open(ViewBozzaComponent,{data:[articolo,{categorie:this.categorie,luoghi:this.luoghi,tags:this.tags,temi:this.temi,personaggi:this.personaggi}]})
    dialogRef.afterClosed().subscribe((data:any)=>{this.updateDatasource1(this.paginator.pageIndex,this.paginator.pageSize,'id')})
  }}
}
