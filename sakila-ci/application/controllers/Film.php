<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Film extends CI_Controller {

	protected $ci;

	public function __construct()
	{
		parent::__construct();
		$this->ci =& get_instance();
		
	}

	public function index()
	{
		
	}

	public function list()
	{
		$dataRes = array();
		$this->db->select('film.*, language.name as name_language, original_language.name as name_original_language');
		$this->db->join('language original_language', 'original_language.language_id = film.original_language_id', 'left');
		$this->db->join('language', 'language.language_id = film.language_id', 'left');
		// $this->db->limit(2);
		$query = $this->db->get('film');
		$data = $query->result();
		$dataRes['result'] = 1;
		$dataRes['films'] = $data;		

		$this->ci->output
        ->set_status_header(200)
        ->set_content_type('application/json', 'utf-8')
        ->set_output(json_encode($dataRes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
        ->_display();
		exit;
	}

	public function get()
	{
		$film = $this->input->post('film');
		
		$data = array();

		$this->db->select('film.*, language.name as name_language, original_language.name as name_original_language');
		$this->db->join('language original_language', 'original_language.language_id = film.original_language_id', 'left');
		$this->db->join('language', 'language.language_id = film.language_id', 'left');
		$this->db->where('film_id', $film['film_id']);
		$query = $this->db->get('film');
		$data = $query->row();

		$dataRes['result'] = 1;
		$dataRes['film'] = $data;

		$this->ci->output
        ->set_status_header(200)
        ->set_content_type('application/json', 'utf-8')
        ->set_output(json_encode($dataRes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
        ->_display();
		exit;
	}

	public function insert()
	{
		$film = $this->input->post('film');
		$data = array();
		
		$this->db->insert('film', $film);
		$dataRes['result'] = 1;		

		$this->ci->output
        ->set_status_header(200)
        ->set_content_type('application/json', 'utf-8')
        ->set_output(json_encode($dataRes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
        ->_display();
		exit;
	}

	public function edit()
	{
		$actor = $this->input->post('actor');
		$data = array();
		
		$this->db->where('actor_id', $actor['actor_id']);
		$this->db->update('actor', $actor);
		$dataRes['result'] = 1;		
		
		$this->ci->output
        ->set_status_header(200)
        ->set_content_type('application/json', 'utf-8')
        ->set_output(json_encode($dataRes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
        ->_display();
		exit;
	}

	public function delete()
	{
		$actor = $this->input->post('actor');
		$data = array();
		
		$this->db->where('actor_id', $actor['actor_id']);		
		$this->db->delete('actor');
		$dataRes['result'] = 1;
		
		$this->ci->output
        ->set_status_header(200)
        ->set_content_type('application/json', 'utf-8')
        ->set_output(json_encode($dataRes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
        ->_display();
		exit;
	}

}

/* End of file Film.php */
/* Location: ./application/controllers/Film.php */