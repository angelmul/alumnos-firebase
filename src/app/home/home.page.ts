import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';
import { EditarAlumnoPage } from '../editar-alumno/editar-alumno.page';
import { Alumno } from '../modelo/Alumno';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  private alumnos=new Array<Alumno>();

  constructor(private apiService: ApiServiceProvider,
    public alertController:AlertController, public modalController: ModalController, public toastController: ToastController) {
}

  ngOnInit(): void {
    this.apiService.getAlumnos().subscribe((resultadoConsultaAlumnos) => {

      this.alumnos = new Array<Alumno>();

      resultadoConsultaAlumnos.forEach((datosTarea: any) => {

        let alumnoJsonObject=datosTarea.payload.doc.data();

        alumnoJsonObject.id=datosTarea.payload.doc.id,

        this.alumnos.push(

          Alumno.createFromJsonObject(alumnoJsonObject)

        );

      });

    });
  }

  async modificarAlumno(indice:number) {
    const modal = await this.modalController.create({
      component: EditarAlumnoPage,
      componentProps: {
        'alumnoJson': JSON.stringify(this.alumnos[indice])
      }
    });
  
    modal.onDidDismiss().then((data) => {
      if (data['data'] != null) { 
        let alumnoJSON=JSON.parse(data['data']);
        let alumnoModificado:Alumno = Alumno.createFromJsonObject(alumnoJSON);
        this.apiService.modificarAlumno(alumnoModificado.id,alumnoModificado)  //se hace PUT a la API
                .then( (alumno:Alumno)=> {
                  this.alumnos[indice]=alumno;  //si se ha modificado en la api se actualiza en la lista
                })
                .catch( (error:string) => {
                    console.log(error);
                });
      }
    });
    
    return await modal.present();
  } //end_modificarAlumno

  eliminarAlumno(indice:number){
    this.apiService.eliminarAlumno(this.alumnos[indice].id)
    .then( (correcto:boolean ) => {
      console.log("Borrado correcto del alumno con indice: "+indice);
      //this.alumnos.splice(indice,1);
    })
    .catch( (error:string) => {
        console.log("Error al borrar: "+error);
    });
  }//end_eliminar_alumno

}//end_class