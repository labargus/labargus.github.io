 window.addEventListener('DOMContentLoaded', function(){			
 	var bodyId = document.getElementsByTagName("body")[0].id;

 	const firebaseConfig = {
 		apiKey: "AIzaSyBLIgkLUZbZRlhRhbiWmrxfoHpdGRRZFbY",
 		authDomain: "escapevirus-251fe.firebaseapp.com",
 		projectId: "escapevirus-251fe",
 		storageBucket: "escapevirus-251fe.appspot.com",
 		messagingSenderId: "42028126806",
 		appId: "1:42028126806:web:9c7aa4f3c6478c243021f7"
 	};
 	const defaultProject = firebase.initializeApp(firebaseConfig);
 	console.log(defaultProject.name);
 	var defaultFirestore = defaultProject.firestore();
 	defaultFirestore = firebase.firestore();

 	MostraScore();

 	document.getElementById("btPlay").onclick = function(){
 		IniciaJogo();
 	};
 	document.getElementById("btSalva").onclick = function(){
 		ClickSalva();
 	};
 	function IniciaJogo(){
 		jogoativo=true;
 		count=0;
 		freq=300;
 		velocidade=1.5;
 		seconds=0;

 		for (var i = 0; i < particles.length; i++) {
 			content.removeChild(particles[i]);
 		}
 		particles=[];

 		document.getElementById("gui_le_score").style.display="none";
 		document.getElementById("gui_salva_score").style.display="none";
 		document.getElementById("gui").classList.add("avoid-clicks");
 	}
 	function MostraScore(){
 		const nodeItens = document.getElementById("leaderboard_itens");
 		nodeItens.innerHTML = '';
 		let j=0
 		defaultFirestore.collection(bodyId).orderBy("score", "desc")
 		.get()
 		.then((querySnapshot) => {
 			querySnapshot.forEach((doc) => {
 				const nodeData=doc.data();
 				let li = document.createElement('li');
 				if(j==0){
 					j=1;
 					li.style.background= "#fa6855";
 				}else{
 					j=0;
 					li.style.background= "#e0574f";
 				}
 				let mark = document.createElement('mark');
 				mark.innerHTML=nodeData.name;
 				let small = document.createElement('small');
 				small.innerHTML=nodeData.score;
 				li.appendChild(mark);
 				li.appendChild(small);
 				nodeItens.appendChild(li);
 			});
 		})
 		.catch((error) => {
 			console.log("Error getting documents: ", error);
 		});
 		document.getElementById("gui_le_score").style.display="block";
 		document.getElementById("gui_salva_score").style.display="none";
 		document.getElementById("gui").classList.remove("avoid-clicks");

 	}
 	function MostraGuiSalva(){
 		document.getElementById("gui_score_pontos").innerText =localStorage.recorde+" pontos";
 		document.getElementById("btSalva").disabled = false; 
 		document.getElementById("gui_salva_score").style.display="block";
 		document.getElementById("gui").classList.remove("avoid-clicks");

 	}
 	function ClickSalva(){

 		let censura=document.getElementById("playerName").value;
 		document.getElementById("btSalva").disabled = true; 

 		defaultFirestore.collection(bodyId).add({
 			name: censura,
 			score: localStorage.recorde
 		})
 		.then((docRef) => {
 			console.log("Document written with ID: ", docRef.id);
 			MostraScore();
 		})
 		.catch((error) => {
 			console.error("Error adding document: ", error);
 		});
 	}
 	var input = document.getElementById("playerName");
 	input.addEventListener("keyup", function(event) {
 		console.log("teste")
 		if (event.keyCode === 13) {
 			event.preventDefault();
 			ClickSalva();
 		}
 	}); 
 });