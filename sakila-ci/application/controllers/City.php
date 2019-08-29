<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class City extends CI_Controller {

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
		$this->db->select('city.*, country.country as country');
		$this->db->join('country', 'country.country_id = city.country_id', 'left');		
		$query = $this->db->get('city');
		$data = $query->result();
		$dataRes['result'] = 1;
		$dataRes['cities'] = $data;		

		$this->ci->output
        ->set_status_header(200)
        ->set_content_type('application/json', 'utf-8')
        ->set_output(json_encode($dataRes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
        ->_display();
		exit;
	}

	public function get()
	{
		$city = $this->input->post('city');
		
		$data = array();
		$this->db->where('city_id', $city['city_id']);
		$query = $this->db->get('city');
		$data = $query->row();

		$dataRes['result'] = 1;
		$dataRes['city'] = $data;

		$this->ci->output
        ->set_status_header(200)
        ->set_content_type('application/json', 'utf-8')
        ->set_output(json_encode($dataRes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
        ->_display();
		exit;
	}

	public function insert()
	{
		$city = $this->input->post('city');
		$data = array();
		
		$this->db->insert('city', $city);
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
		$city = $this->input->post('city');
		$data = array();
		
		$this->db->where('city_id', $city['city_id']);
		$this->db->update('city', $city);
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
		$city = $this->input->post('city');
		$data = array();
		
		$this->db->where('city_id', $city['city_id']);		
		$this->db->delete('city');
		$dataRes['result'] = 1;
		
		$this->ci->output
        ->set_status_header(200)
        ->set_content_type('application/json', 'utf-8')
        ->set_output(json_encode($dataRes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
        ->_display();
		exit;
	}

}

/* End of file City.php */
/* Location: ./application/controllers/City.php */