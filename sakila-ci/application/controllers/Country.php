<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Country extends CI_Controller {

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
		$query = $this->db->get('country');
		$data = $query->result();
		$dataRes['result'] = 1;
		$dataRes['countrys'] = $data;		

		$this->ci->output
        ->set_status_header(200)
        ->set_content_type('application/json', 'utf-8')
        ->set_output(json_encode($dataRes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
        ->_display();
		exit;
	}

	public function get()
	{
		$country = $this->input->post('country');
		
		$data = array();
		$this->db->where('country_id', $country['country_id']);
		$query = $this->db->get('country');
		$data = $query->row();

		$dataRes['result'] = 1;
		$dataRes['country'] = $data;

		$this->ci->output
        ->set_status_header(200)
        ->set_content_type('application/json', 'utf-8')
        ->set_output(json_encode($dataRes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
        ->_display();
		exit;
	}

	public function insert()
	{
		$country = $this->input->post('country');
		$data = array();
		
		$this->db->insert('country', $country);
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
		$country = $this->input->post('country');
		$data = array();
		
		$this->db->where('country_id', $country['country_id']);
		$this->db->update('country', $country);
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
		$country = $this->input->post('country');
		$data = array();
		
		$this->db->where('country_id', $country['country_id']);		
		$this->db->delete('country');
		$dataRes['result'] = 1;
		
		$this->ci->output
        ->set_status_header(200)
        ->set_content_type('application/json', 'utf-8')
        ->set_output(json_encode($dataRes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
        ->_display();
		exit;
	}

}

/* End of file Country.php */
/* Location: ./application/controllers/Country.php */