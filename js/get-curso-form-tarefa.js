
var select_curso = $('#acf-field_5aac1e20a7f4c');
var finalidade = $('#acf-field_5787b4caf1816');
var modalidade = $('#acf-field_5787b24219ab5');
var titulo = $('#acf-_post_title');
var area = $('#acf-field_5928946de2e8a');
var subarea = $('[data-name="subarea_tarefa"] .acf-input select');
var imagem = '<a id="link" href="" target="_blank" style="display:none;"><img id=imagem-curso src="" style="width:50%; padding:20px 0 0;"></a>';
$(imagem).insertAfter(select_curso);

// INSERE OS VALORES SALVOS DO MEU PERFIL NO FORMULARIO

var unidade = $('#acf-field_58d1a32b9f77e');
var telefone = $('#acf-field_58dd757e6b614');
unidade.val($('#cd-user-unidade').html());

var SPMaskBehavior = function (val) {
  return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
},
spOptions = {
  onKeyPress: function(val, e, field, options) {
      field.mask(SPMaskBehavior.apply({}, arguments), options);
    }
};

telefone.val($('#cd-user-telefone').html()).mask(SPMaskBehavior, spOptions);

// SE O USUARIO VIER DA PAGINA DO CURSO

$(function(){
  if (getUrlParameter('post_id')) {
  finalidade.trigger('click'); // Clica em D. de Curso
  select_curso.change(); // Seleciona o curso
  }
})

// AO SELECIONAR UM CURSO NA LISTA

$(select_curso).on('change', function() {

  var post_id = this.value;

  $.post({
    url: ajaxurl,
    data: { action : 'get_curso', post_id : post_id},

    success: function(response) {

      if (response != false) {

        var curso = $.parseJSON(response);

        if (curso['modalidade'] == 'pos-graduacao') {
          curso['modalidade'] = 'pos';
        } else if (curso['modalidade'] == 'extensao-universitaria') {
          curso['modalidade'] = 'extensao';
        }

        modalidade.val(curso['modalidade']);
        titulo.val(curso['titulo']);
        area.val(curso['area']).trigger('change');
        subarea.val(curso['subarea']);
        $('#imagem-curso').attr('src', curso['imagem'])
        $('#link').attr('href', curso['link']).show();

      }
    }
  });
})

// SELECT2 - CLEARING EVENT

$('input#acf-field_5aac1e20a7f4c-input').on('select2-clearing', function(e) {
  select_curso.val('');
  modalidade.val('');
  titulo.val('');
  area.val('').trigger('change');
  subarea.val('')
  $('#link').hide();
})

// GET URL FUNCTION

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
