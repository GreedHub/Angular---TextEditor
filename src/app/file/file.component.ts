import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TextService } from '../text-service/text.service';
import { Synonym } from '../models/Synonym';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit {
  text$: Promise<string>;
  wordSynonyms:Synonym[];
  selectedWord:any;
  @Output() wordEmitter = new EventEmitter();

  constructor(private textService: TextService) {
  }

  ngOnInit() {
    this.text$ = this.textService.getMockText();    
  }

  onWordSelection(ev:any){

    this.selectedWord = ev.selection;    
        
    //Prevent clearing synonyms after selecting a style
    if (!ev.selection.getRangeAt(0).commonAncestorContainer.tagName)
    this.wordEmitter.emit(ev.text);
      
  }  

  replaceSynonym(synonym:string){
    let range = this.selectedWord.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(synonym));

    //Clear synonyms and selection
    this.reselectWordAfterChange(document);
  }

  toggleTag(tagName:string){
    if(this.selectedWord.getRangeAt(0).commonAncestorContainer === document) return;
    const range = this.selectedWord.getRangeAt(0);
    const removedTag = this.checkAppliedTag(tagName,range);
    return !removedTag ? this.addTag(tagName) : null;
  }

  addTag(tagName:string){
    let newTag = document.createElement(tagName);
    this.selectedWord.getRangeAt(0).surroundContents(newTag);
    this.reselectWordAfterChange(newTag.firstChild);
  }

  checkAppliedTag(tagName:string,range:Range){
    let container = range.commonAncestorContainer;
    
    //check every parent tag till container
    while(container.nodeName.toLowerCase() !== 'div'){

      if(container.nodeName.toLowerCase() === tagName){
        let wordPtr = container.firstChild;
        
        //Give the childs to parent and delete tag
        container.parentNode.insertBefore(container.firstChild,container);
        container.parentNode.removeChild(container);
        
        //Reselect text
        this.reselectWordAfterChange(wordPtr);

        return true;
      }
      
      container = container.parentNode;
    }

    return false;
  }

  reselectWordAfterChange(element:any){
    while(element.firstChild){
      element = element.firstChild;
    }

    //Create a new range pointing to word
    let newRange = new Range();
    newRange.selectNode(element); 

    //Reselect word
    this.selectedWord.removeAllRanges();
    this.selectedWord.addRange(newRange);

  }
}


