using System.ComponentModel.DataAnnotations;

namespace Models;

public enum Department
{
    Technology,
    Marketing,
    Sales,
    HR,
    Finance,
    Operations,
    Legal
}

public class Post
{
    public int Id { get; set; }
    
   
    public string Title { get; set; } = null!;
    
   
    public string Content { get; set; } = null!;
    
    public Department Department { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? UpdatedAt { get; set; }
}