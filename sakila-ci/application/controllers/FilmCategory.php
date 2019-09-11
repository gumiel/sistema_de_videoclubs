<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class FilmCategory extends CI_Controller {

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

		$this->db->select('category.*');
		$this->db->join('film_category', 'film_category.film_id = film.film_id', 'inner');
		$this->db->join('category', 'category.category_id = film_category.category_id', 'inner');
		$this->db->where('film.film_id', $film['film_id']);
		$query = $this->db->get('film');
		
		$data = $query->result();
		$dataRes['result'] = 1;
		$dataRes['categories'] = $data;

		$this->ci->output
        ->set_status_header(200)
        ->set_content_type('application/json', 'utf-8')
        ->set_output(json_encode($dataRes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
        ->_display();
		exit;
	}

	public function insert()
	{
		$film_category = $this->input->post('film_category');
		$data = array();
		
		$this->db->insert('film_category', $film_category);
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
		$film_category = $this->input->post('film_category');
		$data = array();
		
		$this->db->where('film_id', $film_category['film_id']);		
		$this->db->where('category_id', $film_category['category_id']);		
		$this->db->delete('film_category');
		$dataRes['result'] = 1;
		
		$this->ci->output
        ->set_status_header(200)
        ->set_content_type('application/json', 'utf-8')
        ->set_output(json_encode($dataRes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
        ->_display();
		exit;
	}

}

/* End of file FilmCategory.php */
/* Location: ./application/controllers/FilmCategory.php */