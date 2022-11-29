import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipamentoService } from 'src/app/core/services/equipamento.service';

@Component({
  selector: 'app-alterar-equipamentos',
  templateUrl: './alterar-equipamentos.component.html',
  styleUrls: ['./alterar-equipamentos.component.css']
})
export class AlterarEquipamentosComponent {
  equipamento: any = []

  categorias: string[] = ["Câmeras", "Filmadoras", "Lentes", "Iluminação", "Acessórios"]

  constructor(private service: EquipamentoService, private route: ActivatedRoute, private router: Router) {
    var routeParams = this.route.snapshot.paramMap
    let id = parseInt(routeParams.get('id') || '')
    this.service.consultarPorId(id).subscribe(data => this.equipamento = data)
  }

  alterar(id: number, dados: any) {
    this.service.alterar(id, dados).subscribe()
    this.router.navigate(['/detalhar-equipamentos/', id])
  }

  validate(event:Event, id:number, dados: any){
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else{
      if(dados.urlFoto==""){
        dados.urlFoto = "https://www2.camara.leg.br/atividade-legislativa/comissoes/comissoes-permanentes/cindra/imagens/sem.jpg.gif/image"
      }
      this.alterar(id, dados)
    }
    form.classList.add('was-validated');

  }
}
