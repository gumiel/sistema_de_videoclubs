<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Actor extends CI_Controller {

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
		$query = $this->db->get('actor');
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

	public function get()
	{
		$actor = $this->input->post('actor');
		
		$data = array();
		$this->db->where('actor_id', $actor['actor_id']);
		$query = $this->db->get('actor');
		$data = $query->row();

		$dataRes['result'] = 1;
		$dataRes['actor'] = $data;

		$this->ci->output
        ->set_status_header(200)
        ->set_content_type('application/json', 'utf-8')
        ->set_output(json_encode($dataRes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
        ->_display();
		exit;
	}

	public function insert()
	{
		$actor = $this->input->post('actor');
		$data = array();
		
		$this->db->insert('actor', $actor);
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

/* End of file Actor.php */
/* Location: ./application/controllers/Actor.php */