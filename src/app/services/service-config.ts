import { HttpHeaders } from '@angular/common/http';

export class ServiceConfig{

    service_config = {
        'service':'',
        'host':this.getHost()
    };

    public get headers(): HttpHeaders {

        return new HttpHeaders().set("Content-Type", "application/json");

    }
    
    getHost(): string {   
        return `https://api.datamuse.com`;
    }
    
    

}
