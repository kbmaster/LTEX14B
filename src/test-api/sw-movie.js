import { LitElement, html } from 'lit-element';  

export class SwMovie extends LitElement {    
	
	//Bind
	static get properties() {		
		return {
			title:{type:String},			
			planets:{type:Array},
			planetInfo:{type:Array}
		};
	}	

	
	constructor() {
		// Always calls super() first.
		super();
		this.title="";
		this.planets=[];    //urls
		this.planetInfo=[]; 
	}

	// Properties code up here	   
	render() {

	return html`
		<a href='' @click="${this.getPlanets}">
			${this.title} </a>
			<ul>
			${this.planetInfo.map(function(planet)
			{
				return html `<li>${planet}</li>`
			})}
			<ul>
		
		`;
	}

      getPlanets(e)
      {
		e.preventDefault();
		console.log(this.planets);
		this.planets.forEach(function(p)
		{
			this.getData(p);

		}.bind(this));
      }

      getData(url) 
      {
        let xhr = new XMLHttpRequest();

        xhr.onload = function(){

            if (xhr.status === 200) {
                console.log("Peticion completada correctamente");
                let planet = JSON.parse(xhr.responseText);
                this.planetInfo=[...this.planetInfo, planet.name];
            }

        }.bind(this);

        xhr.open("GET", url);
        xhr.send();
    }	
	

}

customElements.define('sw-movie', SwMovie);

