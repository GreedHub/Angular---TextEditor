import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { DatamuseService } from 'src/app/services/datamuse.service';
import { Synonym } from 'src/app/models/Synonym';

@Component({
  selector: 'app-synonyms',
  templateUrl: './synonyms.component.html',
  styleUrls: ['./synonyms.component.scss']
})
export class SynonymsComponent implements OnInit {

  constructor(private datamuseService:DatamuseService) { }
  synonyms:Synonym[];
  
  @Output() synonymEmitter = new EventEmitter();

  ngOnInit() {
  }

  getSynonyms(word){
    this.datamuseService.getSynonyms(word).subscribe(synonyms=>{
      this.synonyms = synonyms;
    })
  }

  setSynonym(synonym:string){
    this.synonymEmitter.emit(synonym);
  }

}
