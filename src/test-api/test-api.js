import { LitElement, html } from 'lit-element';  
import './sw-movie.js';

class TestApi extends LitElement {    
	
	//Bind
	static get properties() {		
		return {
			title:{type:String},			
			movies:{type:Array}
		};
	}	

	
	constructor() {
		// Always calls super() first.
		super();
		this.title="";
		this.movies=[];
		this.getMovieData();
	}

	// Properties code up here	   
	render() {

	return html`
		<div>
			<h3>${this.title}</h3>
			${this.movies.map(
				function(movie)
				{
				
					return html ` <div>
							<sw-movie title="${movie.title}" .planets="${movie.planets}"></sw-movie>
						       </div>	
						    `;
				}
			)}
		</div>
		`;
	}

      getMovieData() 
      {
        console.log("getMovieData");
        console.log("Obteniendo datos de las peliculas");

        let xhr = new XMLHttpRequest();

        xhr.onload = function(){

            if (xhr.status === 200) {
                console.log("Peticion completada correctamente");

                let APIResponse = JSON.parse(xhr.responseText);

                this.movies = APIResponse.results;
                console.log(this.movies);
            }

        }.bind(this);

        xhr.open("GET", "https://swapi.dev/api/films/");
        xhr.send();
    }	
	
	
	

}

customElements.define('test-api', TestApi);

