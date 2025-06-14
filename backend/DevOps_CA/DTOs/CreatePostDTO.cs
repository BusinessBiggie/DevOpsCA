using System.ComponentModel.DataAnnotations;
using Models;

namespace backend.DTOs;

public class CreatePostDTO
{

    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = null!;

    [Required]
    [MaxLength(2400)]
    public string Content { get; set; } = null!;

    [Required]
    public Department Department { get; set; }
}