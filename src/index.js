import './scss/main.scss';
import $, { each } from 'jquery'



/*  Desctop menu && share block */

if ($(window).width() >= 1024) {
  let menu = $('.Bug').children().clone();
  $(menu[1]).addClass('desktop');
  $('.Bug').remove();
  $(menu[1]).insertAfter(".Logo");

  let share = $('.PLAYER .Share').children().clone();
  $('.Share').remove();
  $('.StatShare').append(share)
  
}




/*  Render table  */

function formDataTable(response)
{
    let allcolumns = response.columns;
    let $table = $('<table class="table_sort">');
    let $thead = $('<thead>').appendTo($table);
    let $trh = $('<tr>').appendTo($thead);
    $(allcolumns).each(function(i){
      $('<th>',{'html':allcolumns[i]}).appendTo($trh);

      });
    
    let allData = response.data;
    let $tbody = $('<tbody>').appendTo($table);
    $(allData).each(function(x){
      let $tr = $('<tr>').appendTo($tbody);
      $(allData[x]).each(function(y){
         $('<td>',{'html':allData[x][y]}).appendTo($tr);
      });
    });
    $("#showData").html($table);
}

let statsTable = {
  "columns": ['Сезон', 'Кол-во игр', 'Гол', 'Пас', 'Гол + пас', 'Рейтинг'],
  "data": [
     [
       ['Сезон 2021/2020'],
       ['5'],
       ['5'],
       ['2'],
       ['1'],
       ['89.40'],
     ],
     [
      ['Сезон 2020/2019'],
      ['5'],
      ['3'],
      ['2'],
      ['1'],
      ['89.40'],
    ],
    [
      ['Сезон 2019/2018'],
      ['5'],
      ['5'],
      ['4'],
      ['1'],
      ['89.40'],
    ],
    [
      ['Сезон 2018/2017'],
      ['5'],
      ['5'],
      ['2'],
      ['1'],
      ['85.40'],
    ],
    [
      ['Сезон 2017/2016'],
      ['5'],
      ['5'],
      ['2'],
      ['1'],
      ['89.40'],
    ],
  ],
 
  }
 
 formDataTable(statsTable);
 




/*  Filter table  */

  document.addEventListener('DOMContentLoaded', () => {
    const getSort = ({ target }) => {
        const order = (target.dataset.order = -(target.dataset.order || -1));
        const index = [...target.parentNode.cells].indexOf(target);
        const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
        const comparator = (index, order) => (a, b) => order * collator.compare(
            a.children[index].innerHTML,
            b.children[index].innerHTML
        );
        
        for(const tBody of target.closest('table').tBodies)
            tBody.append(...[...tBody.rows].sort(comparator(index, order)));

        for(const cell of target.parentNode.cells)
            cell.classList.toggle('sorted', cell === target);
    };
    

    document.querySelectorAll('.table_sort thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));
    $('.progress--bar').css('height', $('.progress--bar').css('width'))
  
    $( window ).resize(function() {
      $('.progress--bar').css('height', $('.progress--bar').css('width'))
    });
});






  

/*  DROPDOWN  */

let toggleNav = 0;
let toggleStats = 0;
let toggleFormat = 0;

function changeArrow(toggle, id, show){
  
  if(!toggle){
    toggle++;
    id.removeClass("fa-chevron-down").addClass("fa-chevron-up");
  }else{
    toggle--;
    id.removeClass("fa-chevron-up").addClass("fa-chevron-down");
  }
  show.toggleClass("show");
  return toggle
}



window.onclick = function(event) {



    if (event.target.matches('.dropdown--btn')) {

      if(event.target.matches("#menu")){
        $('#menu--items').toggleClass("show");
      }else if(event.target.matches("#stat")){
        toggleStats = changeArrow(toggleStats, $('#stat > .fas'), $('#stats'));
        $(event.target).toggleClass("btn-color-change");
      }else if(event.target.matches("#format")){
        toggleFormat = changeArrow(toggleFormat, $('#format > .fas'), $('#formats'));
        $(event.target).toggleClass("btn-color-change");
      }


        
      /*  seasons  */
        
    }
    
    
    else if(event.target.matches(".toggle--options--btn")){
      if($(event.target).prev().length==1){
        $(event.target).prev().removeClass("toggle--options--btn--active").addClass("toggle--options--btn");
        $(event.target).addClass("toggle--options--btn--active");
      }else{
        $(event.target).next().removeClass("toggle--options--btn--active");
        $(event.target).addClass("toggle--options--btn--active");
      }

      /*  seasons  */



    }else{
  
      if(toggleStats || toggleFormat ){
        $(".dropdown--btn").removeClass("btn-color-change");
      }
      
      
      $('.dropdown--btn > .fas').removeClass("fa-chevron-up").addClass("fa-chevron-down");
      let dropdowns = $(".dropdown--content");
      for (let i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }

      toggleStats=0;
      toggleFormat = 0;
    }





  }


  
