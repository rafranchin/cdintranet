
// CHECA O USUARIO LOGADO

$.post(
  ajaxurl,
  {action: 'usuario_logado'},
  function(response) {

    if (response == 'edit_pages') {
      contador_feed();
      setInterval(notificacao_new_task_push_ajax, 120000);
      setInterval(contador_feed, 120000);
      // contador_feed();
    } else if (response == 'senac') {
      contador_feed();
      setInterval(contador_feed, 120000);
    }

  }

);

// NEW TASK PUSH

var naoLido_old;

function notificacao_new_task_push_ajax() {

  $.post(
    ajaxurl,
    {action: 'new_task_push'},

    function(response) {

    var naoLido = 0;
    naoLido = response;

    // alert(naoLido + ' - ' + naoLido_old);

    if (naoLido_old < naoLido) {
      $(".cd-push").hide();
    	$(".cd-push").html( '<div class="ui blue message"><i class="close icon"></i><div class="header"><i class="blue info circle icon"></i> <a href="http://cd.intranet.sp.senac.br/minhas-tarefas/">Você tem novas tarefas</a></div></div>' );
      $(".cd-push").show();
      $(".cd-push").animate({right: '20px'});
      $(".close").click(function(){
          $(".cd-push").animate({right: '-400px'});
      });
    }

    naoLido_old = naoLido;

    }

  );

}

// CONTADOR FEED

var loading_icon = false;

function contador_feed() {

  // FEED REFRESH

  $.post({
      url: ajaxurl,
      data: {action: 'carrega_loop'},
      success: function(response) {
       $('#refresh').html(response);
      }
  });

  // $('#refresh').load('http://localhost:8888/cdintranet/wp-content/themes/comunicacao-digital/feed-refresh.php');
  // $('.refresh').addClass("loading");

  $('.contador').removeClass("green");
  $('.contador').removeClass("red");

  if (loading_icon == true) {
    $('.contador').html('<i class="loading refresh icon" style="margin:0;"></i>');
  }

  $(document).ajaxStop(function() {

  var naoLido = 0;
  naoLido = $('#refresh .feed-nao-lido').length;

  if (naoLido <= 30 && naoLido  >= 1){
    $('.contador').html(naoLido);
    $('.contador').addClass("red");
    $('.title-contador').html('(' + naoLido + ') ' + cd_title);
  } else if (naoLido == 0) {
    $('.contador').html('<i class="check icon" style="margin:0;"></i>');
    $('.contador').addClass("green");
    $('.title-contador').html(cd_title);
  } else if (naoLido > 30) {
    $('.contador').html("30+");
    $('.contador').addClass("red");
    $('.title-contador').html('(30+) ' + cd_title);
  }

  loading_icon = true;

  $(this).unbind('ajaxStop');

  });

}



// setInterval(feed_refresh, 5000);
//
// function feed_refresh() {
//
//   $.post(
//     ajaxurl,
//     {action: 'verifica_atualizacao'},
//     function(response) {
//       if(response == '1') {
//
//         $('#refresh').load('<?php echo bloginfo('template_url')?>/feed-refresh.php');
//         $('.refresh').addClass("loading");
//
//         // // FEED REFRESH - OUTRO METODO
//         // jQuery.post({
//         //     url: ajaxurl,
//         //     data: {action: 'carrega_loop'},
//         //     success: function(response) {
//         //      $('#refresh').html(response);
//         //     }
//         // });
//
//         // Aguarda as requisições AJAX terminarem para realizar a contagem
//         $(document).ajaxStop(function() {
//
//         // CONTADOR FEED
//
//         var naoLido = 0;
//         naoLido = $('#refresh .feed-nao-lido').length;
//
//           $('.refresh').removeClass("loading");
//           $('.contador').removeClass("green");
//           $('.contador').removeClass("yellow");
//           $('.contador').removeClass("red");
//           $('.contador').empty();
//
//           if (naoLido <= 30 && naoLido  >= 1){
//             $('.contador').html(naoLido);
//             $('.contador').addClass("floating red ui label");
//             $('.title-contador').html('(' + naoLido + ') ' + cd_title);
//           } else if (naoLido == 0) {
//             $('.contador').html('<i class="check icon" style="margin:0;"></i>');
//             $('.contador').addClass("floating green ui label");
//             $('.title-contador').html(cd_title);
//           } else if (naoLido > 30) {
//             $('.contador').html("30+");
//             $('.contador').addClass("floating red ui label");
//             $('.title-contador').html('(30+) ' + cd_title);
//           }
//
//         // CD NOTIFICAÇAO PUSH
//
//         if (naoLido_old < naoLido) {
//           $(".cd-push").hide();
//         	$(".cd-push").html( '<div class="ui message"><i class="close icon"></i><div class="header"><i class="green refresh icon"></i> Você tem novas notificações</div></div>' );
//           $(".cd-push").show();
//           $(".cd-push").animate({right: '20px'});
//           $(".close").click(function(){
//               $(".cd-push").animate({right: '-400px'});
//           });
//         };
//
//         naoLido_old = naoLido;
//
//         $(this).unbind('ajaxStop');
//
//         });
//       }
//     }
//   );
//
//
//
//   Previne se o usuário for deslogado, suas notificações somem e aparece o botão de login. Função no functions.
// $.post(
//     ajaxurl,
//     {action: 'is_user_logged_in'},
//     function(response) {
//       if(response == 'no') {
//         location.reload(); // recarrega a página
//       }
//     }
//   );
//
// };
