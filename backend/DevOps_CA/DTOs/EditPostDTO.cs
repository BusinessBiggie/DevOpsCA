using System.ComponentModel.DataAnnotations;
using Models;

namespace backend.DTOs;

public class EditPostDTO
{
    public int Id { get; set; }

    [MaxLength(200)]
    public string Title { get; set; } = null!;


    [MaxLength(2400)]
    public string Content { get; set; } = null!;

    public Department Department { get; set; }
}