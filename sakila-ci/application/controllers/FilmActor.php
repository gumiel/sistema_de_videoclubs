<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class FilmActor extends CI_Controller {

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
		$film = $this->input->post('film');
		
		$data = array();

		$this->db->select('actor.*');
		$this->db->join('film_actor', 'film_actor.film_id = film.film_id', 'inner');
		$this->db->join('actor', 'actor.actor_id = film_actor.actor_id', 'inner');
		$this->db->where('film.film_id', $film['film_id']);
		$query = $this->db->get('film');
		
		$data = $query->result();
		$dataRes['result'] = 1;
		$dataRes['actors'] = $data;

		$this->ci->output
        ->set_status_header(200)
        ->set_content_type('application/json', 'utf-8')
        ->set_output(json_encode($dataRes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
        ->_display();
		exit;
	}

	public function insert()
	{
		$film_actor = $this->input->post('film_actor');
		$data = array();
		
		$this->db->insert('film_actor', $film_actor);
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
		$film_actor = $this->input->post('film_actor');
		$data = array();
		
		$this->db->where('film_id', $film_actor['film_id']);		
		$this->db->where('actor_id', $film_actor['actor_id']);		
		$this->db->delete('film_actor');
		$dataRes['result'] = 1;
		
		$this->ci->output
        ->set_status_header(200)
        ->set_content_type('application/json', 'utf-8')
        ->set_output(json_encode($dataRes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
        ->_display();
		exit;
	}

}

/* End of file FilmActor.php */
/* Location: ./application/controllers/FilmActor.php */