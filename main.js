//All materializ initializations
document.addEventListener('DOMContentLoaded', (e)=>{
    const caro=document.querySelector('.carousel')
    const sidenav=document.querySelectorAll('.sidenav')
    const scrollspy=document.querySelectorAll('.scrollspy')
    const matete=document.querySelectorAll('.materialboxed')


    const cinstance=M.Carousel.init(caro, {
        fullWidth:true
    })
    setInterval(()=>{cinstance.next()}, 7000)
    document.querySelector('.previous').addEventListener('click', (e)=>cinstance.prev())
    document.querySelector('.next').addEventListener('click', (e)=>cinstance.next())


    const sinstance=M.Sidenav.init(sidenav);
    M.ScrollSpy.init(scrollspy, {throttle:1000})
    M.MaterialBoxed.init(matete)
    
})  
//end



//focus textbox on click
document.querySelector('.search1').addEventListener('click', (e)=>{
    document.querySelector('.kilo_map').focus()
})
document.querySelector('.search2').addEventListener('click', (e)=>{
    document.querySelector('.kilo').focus();
})
//end


//all google map functions
const add_marker=(map,lat,lng)=>{
const  marker=new google.maps.Marker({map,position:{lat,lng}})
}
function initialize(){
    const lat=6.4698
    const lng=3.5852
        const  map=new google.maps.Map(document.querySelector('.map'), {zoom:16,center:{lat,lng}})
        add_marker(map, lat, lng)
        }

         document.querySelector('.search_form').addEventListener('submit', (e)=>search_function(e))
         document.querySelector('.search_form_map').addEventListener('submit', (e)=>search_function(e))
         function error(err){
            return error
        }             
          

         function search_function(e){
            e.preventDefault();
            alert('Note that you need to allow location access for this feature to work correctly')
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition((position)=>{
                    const {latitude, longitude}=position.coords
                    const  map2=new google.maps.Map(document.querySelector('.map'), {zoom:16,center:{lat:latitude,lng:longitude}})
                    add_marker(map2, latitude, longitude)


             let enteredFigure=document.querySelector('.kilo').value||document.querySelector('.kilo_map').value;
             const request = {
                location:{lat:latitude,lng:longitude},
                radius:Number(enteredFigure),
                type: ['hospital']
              }

              service = new google.maps.places.PlacesService(map2);
              service.nearbySearch(request, callback);
           
    
                }, (error)=>{return error}
       )//end watch


        }
    }
    
        function callback(results, status){
            const meters=document.querySelector('.kilo').value||document.querySelector('.kilo_map').value;
            if(status==google.maps.places.PlacesServiceStatus.ZERO_RESULTS)
              {
                alert(`Sorry to say, but no hospital was found within ${meters} meters of your location. You may try a larger radius`);
                document.querySelector('.search_form').reset();
                document.querySelector('.search_form_map').reset();
    
              } 
         else if (status==google.maps.places.PlacesServiceStatus.OK)
             {
              alert(`Your search returned ${results.length} hospitals. Click okay to see them`);

              document.querySelector('.result').innerHTML+=`<div class='collection-header'><h5> Your search results</h5></div>`
               results.forEach(eachHospital=>{
                   document.querySelector('.result').innerHTML+=`<li class='collection-item blue-text'>${eachHospital.name}, ${eachHospital.vicinity}</li>`
            })
            document.querySelector('.search_form').reset();
            document.querySelector('.search_form_map').reset();
   
             }
          else {
             alert("Sorry, Your search was not successful");
             document.querySelector('.search_form').reset();
             document.querySelector('.search_form_map').reset();
 
             }
            }
    



       //end




       //gsap animations
        gsap.registerPlugin('textPlugin');

       const elements=document.querySelectorAll('#animate_opacity')
       elements.forEach(element=>{gsap.to(`#${element.id}`, {color:'white', repeat:-1, yoyo:true, duration:2, ease:'bounce.inOut'})})

       gsap.to('.aproko', {text:'Input a radius in meters and click search. Your search results will appear above. Please refresh the page before every new search.', duration:10, repeat:-1, yoyo:true})


       //end



